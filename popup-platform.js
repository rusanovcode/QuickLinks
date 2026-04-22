import { BACKUP_ROOT_TITLE } from './popup.js';

export function openBrowserTab(url) {
  chrome.tabs.create({ url });
}

export async function getActiveTab() {
  const tabs = await tabsQuery({
    active: true,
    currentWindow: true
  });
  return tabs[0] || null;
}

export function storageGet(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (result) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve(result);
    });
  });
}

export function storageSet(items) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(items, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve();
    });
  });
}

export function tabsQuery(queryInfo) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(queryInfo, (tabs) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve(tabs);
    });
  });
}

export function bookmarksGetTree() {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree((tree) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve(tree);
    });
  });
}

export function bookmarksGetChildren(id) {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getChildren(id, (children) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve(children);
    });
  });
}

export function bookmarksCreate(details) {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.create(details, (node) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve(node);
    });
  });
}

export function bookmarksRemoveTree(id) {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.removeTree(id, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve();
    });
  });
}

export function bookmarksRemove(id) {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.remove(id, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve();
    });
  });
}

export async function getBackupRootNode() {
  const tree = await bookmarksGetTree();
  return findBookmarkNode(tree[0], (node) => !node.url && node.title === BACKUP_ROOT_TITLE);
}

export async function createBackupRootNode() {
  const tree = await bookmarksGetTree();
  const rootChildren = tree[0]?.children || [];
  const backupParent = rootChildren.find((node) => node.id === '2')
    || rootChildren.find((node) => !node.url && node.id !== '0');

  if (!backupParent) {
    throw new Error('Bookmark backup root is unavailable');
  }

  return bookmarksCreate({
    parentId: backupParent.id,
    title: BACKUP_ROOT_TITLE
  });
}

export async function clearBookmarkChildren(parentId) {
  const children = await bookmarksGetChildren(parentId);
  for (const child of children) {
    if (!child.url) {
      await bookmarksRemoveTree(child.id);
      continue;
    }
    await bookmarksRemove(child.id);
  }
}

function findBookmarkNode(node, predicate) {
  if (!node) return null;
  if (predicate(node)) return node;
  if (!Array.isArray(node.children)) return null;

  for (const child of node.children) {
    const match = findBookmarkNode(child, predicate);
    if (match) return match;
  }

  return null;
}
