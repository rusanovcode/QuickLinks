import {
  ALL_COLLECTIONS_KEY,
  LEGACY_STORAGE_KEY,
  SCHEMA_VERSION,
  STORAGE_KEY
} from './popup.js';
import {
  bookmarksCreate,
  bookmarksGetChildren,
  clearBookmarkChildren,
  createBackupRootNode,
  getBackupRootNode,
  storageGet,
  storageSet
} from './popup-platform.js';
import {
  createId,
  deriveNameFromUrl,
  inferLanguage,
  normalizeTheme,
  normalizeUiScale
} from './popup-helpers.js';

export function createStateManager(ctx, deps) {
  function createEmptyState(lang = 'en', theme = 'system') {
    const defaultCollectionId = createId('collection');
    return {
      schemaVersion: SCHEMA_VERSION,
      collections: [
        {
          id: defaultCollectionId,
          name: lang === 'ru' ? 'Основное' : 'Main',
          createdAt: Date.now()
        }
      ],
      links: [],
      settings: {
        lang: inferLanguage(lang),
        theme: normalizeTheme(theme),
        defaultCollectionId,
        filterCollectionId: defaultCollectionId,
        showFavoritesOnly: false,
        uiScale: 1
      }
    };
  }

  function normalizeState(rawState, fallbackLang, fallbackTheme) {
    const safeLang = inferLanguage(rawState?.settings?.lang || fallbackLang);
    const safeTheme = normalizeTheme(rawState?.settings?.theme || fallbackTheme);
    const baseState = createEmptyState(safeLang, safeTheme);
    const collectionsInput = Array.isArray(rawState?.collections) ? rawState.collections : baseState.collections;
    const collectionIds = new Set();
    const collections = [];

    collectionsInput.forEach((collection) => {
      const id = typeof collection?.id === 'string' && collection.id ? collection.id : createId('collection');
      if (collectionIds.has(id)) return;
      collectionIds.add(id);
      collections.push({
        id,
        name: String(collection?.name || '').trim() || (safeLang === 'ru' ? 'Без названия' : 'Untitled'),
        createdAt: Number(collection?.createdAt) || Date.now()
      });
    });

    if (!collections.length) {
      collections.push(...baseState.collections);
      collectionIds.add(baseState.collections[0].id);
    }

    const defaultCollectionId = collectionIds.has(rawState?.settings?.defaultCollectionId)
      ? rawState.settings.defaultCollectionId
      : collections[0].id;

    const filterCollectionId = rawState?.settings?.filterCollectionId === ALL_COLLECTIONS_KEY
      ? ALL_COLLECTIONS_KEY
      : collectionIds.has(rawState?.settings?.filterCollectionId)
        ? rawState.settings.filterCollectionId
        : defaultCollectionId;

    const linksInput = Array.isArray(rawState?.links) ? rawState.links : [];
    const links = [];
    const linkIds = new Set();
    const orderTracker = new Map(collections.map((collection) => [collection.id, 0]));

    linksInput.forEach((link, index) => {
      const sanitized = sanitizeStoredLink(link, {
        fallbackCollectionId: collectionIds.has(link?.collectionId) ? link.collectionId : defaultCollectionId,
        fallbackOrder: index,
        defaultOrder: orderTracker
      });

      if (!sanitized || linkIds.has(sanitized.id)) return;
      linkIds.add(sanitized.id);
      links.push(sanitized);
      orderTracker.set(
        sanitized.collectionId,
        Math.max(orderTracker.get(sanitized.collectionId) || 0, sanitized.order + 1)
      );
    });

    const normalized = {
      schemaVersion: SCHEMA_VERSION,
      collections,
      links,
      settings: {
        lang: safeLang,
        theme: safeTheme,
        defaultCollectionId,
        filterCollectionId,
        showFavoritesOnly: Boolean(rawState?.settings?.showFavoritesOnly),
        uiScale: normalizeUiScale(rawState?.settings?.uiScale)
      }
    };

    reindexAllCollections(normalized);
    return normalized;
  }

  function sanitizeStoredLink(link, options) {
    if (!link || typeof link !== 'object') return null;
    if (!link.url || !link.name) return null;

    try {
      const normalizedUrlData = deps.parseAndNormalizeUrl(String(link.url));
      const collectionId = options.fallbackCollectionId;
      const order = Number.isFinite(link.order)
        ? Number(link.order)
        : (options.defaultOrder.get(collectionId) || options.fallbackOrder || 0);

      return {
        id: typeof link.id === 'string' && link.id ? link.id : createId('link'),
        collectionId,
        name: String(link.name).trim(),
        url: normalizedUrlData.url,
        normalizedUrl: normalizedUrlData.normalized,
        description: String(link.description || '').trim(),
        iconType: sanitizeIconType(link.iconType),
        iconData: typeof link.iconData === 'string' ? link.iconData : null,
        pinned: Boolean(link.pinned),
        order,
        createdAt: Number(link.createdAt) || Date.now(),
        updatedAt: Number(link.updatedAt) || Date.now()
      };
    } catch (error) {
      console.warn('Skipping invalid stored link:', error);
      return null;
    }
  }

  function sanitizeIconType(iconType) {
    return ['favicon', 'preset', 'custom'].includes(iconType) ? iconType : 'favicon';
  }

  function migrateLegacyState(legacyLinks, legacyLang, legacyTheme) {
    const lang = inferLanguage(legacyLang);
    const migrated = createEmptyState(lang, legacyTheme);
    const collectionId = migrated.collections[0].id;

    migrated.links = legacyLinks
      .map((link, index) => sanitizeStoredLink({
        id: createId('legacy-link'),
        collectionId,
        name: link?.name,
        url: link?.url,
        description: link?.description,
        iconType: link?.iconType,
        iconData: link?.iconData,
        pinned: Boolean(link?.pinned),
        order: index,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }, {
        fallbackCollectionId: collectionId,
        fallbackOrder: index,
        defaultOrder: new Map([[collectionId, index]])
      }))
      .filter(Boolean);

    return normalizeState(migrated);
  }

  function reindexAllCollections(targetState = ctx.state) {
    targetState.collections.forEach((collection) => reindexCollection(collection.id, targetState));
  }

  function reindexCollection(collectionId, targetState = ctx.state) {
    const collectionLinks = targetState.links
      .filter((link) => link.collectionId === collectionId)
      .sort((a, b) => a.order - b.order || a.createdAt - b.createdAt);

    collectionLinks.forEach((link, index) => {
      link.order = index;
    });
  }

  async function loadAppState() {
    const stored = await storageGet([STORAGE_KEY, LEGACY_STORAGE_KEY, 'lang', 'theme']);

    if (stored[STORAGE_KEY]) {
      return normalizeState(stored[STORAGE_KEY], stored.lang, stored.theme);
    }

    if (Array.isArray(stored[LEGACY_STORAGE_KEY]) && stored[LEGACY_STORAGE_KEY].length) {
      const migrated = migrateLegacyState(stored[LEGACY_STORAGE_KEY], stored.lang, stored.theme);
      await storageSet({
        [STORAGE_KEY]: migrated,
        lang: migrated.settings.lang,
        theme: migrated.settings.theme
      });
      ctx.bootNotice = deps.textFor(migrated.settings.lang, 'migratedLegacyToast');
      return migrated;
    }

    const base = createEmptyState(inferLanguage(stored.lang), normalizeTheme(stored.theme));
    const restored = await restoreStateFromBookmarksBackup(base.settings.lang, base.settings.theme);

    if (restored && restored.links.length) {
      await storageSet({
        [STORAGE_KEY]: restored,
        lang: restored.settings.lang,
        theme: restored.settings.theme
      });
      ctx.bootNotice = deps.textFor(restored.settings.lang, 'restoredFromBackupToast', {
        count: String(restored.links.length)
      });
      return restored;
    }

    await storageSet({
      [STORAGE_KEY]: base,
      lang: base.settings.lang,
      theme: base.settings.theme
    });

    return base;
  }

  async function persistState(options = {}) {
    const {
      syncBackup = true,
      toastKey = null,
      toastTone = 'success',
      values = {}
    } = options;

    ctx.state = normalizeState(ctx.state);
    ctx.currentLang = ctx.state.settings.lang;
    ctx.currentThemeIndex = deps.getThemeIndex(ctx.state.settings.theme);
    ctx.uiScale = deps.normalizeUiScale(ctx.state.settings.uiScale);

    await storageSet({
      [STORAGE_KEY]: ctx.state,
      lang: ctx.state.settings.lang,
      theme: ctx.state.settings.theme
    });

    if (syncBackup) {
      await syncBackupWithStatus(true);
    }

    deps.applyTheme();
    deps.applyUiScale();
    deps.renderVersion();
    deps.renderAll();

    if (toastKey) {
      deps.showToast(deps.translate(toastKey, values), toastTone);
    }
  }

  async function syncBackupWithStatus(showSuccess) {
    try {
      await syncBookmarksBackup(ctx.state);
      if (showSuccess) {
        ctx.backupFeedback = {
          text: deps.translate('backupReadySuccess'),
          tone: 'success'
        };
      }
    } catch (error) {
      console.error('Backup sync failed:', error);
      ctx.backupFeedback = {
        text: deps.translate('backupSyncFailed'),
        tone: 'warning'
      };
    }
  }

  async function syncBookmarksBackup(appState) {
    const rootNode = await getBackupRootNode();

    if (!appState.links.length) {
      if (rootNode) {
        await clearBookmarkChildren(rootNode.id);
      }
      return;
    }

    const root = rootNode || await createBackupRootNode();
    await clearBookmarkChildren(root.id);

    for (const collection of appState.collections) {
      const folder = await bookmarksCreate({
        parentId: root.id,
        title: collection.name
      });

      const links = appState.links
        .filter((link) => link.collectionId === collection.id)
        .sort((a, b) => a.order - b.order);

      for (const link of links) {
        await bookmarksCreate({
          parentId: folder.id,
          title: link.name,
          url: link.url
        });
      }
    }
  }

  async function restoreStateFromBookmarksBackup(lang, theme) {
    const root = await getBackupRootNode();
    if (!root) return null;

    const children = await bookmarksGetChildren(root.id);
    if (!children.length) return null;

    const restored = createEmptyState(lang, theme);
    restored.collections = [];
    restored.links = [];

    for (const child of children) {
      if (child.url) continue;

      const collectionId = createId('collection');
      restored.collections.push({
        id: collectionId,
        name: child.title || (lang === 'ru' ? 'Восстановлено' : 'Restored'),
        createdAt: Date.now()
      });

      const bookmarkChildren = await bookmarksGetChildren(child.id);
      bookmarkChildren
        .filter((bookmark) => bookmark.url)
        .forEach((bookmark, index) => {
          try {
            const normalizedUrlData = deps.parseAndNormalizeUrl(bookmark.url);
            restored.links.push({
              id: createId('link'),
              collectionId,
              name: bookmark.title || deriveNameFromUrl(bookmark.url),
              url: normalizedUrlData.url,
              normalizedUrl: normalizedUrlData.normalized,
              description: '',
              iconType: 'favicon',
              iconData: null,
              pinned: false,
              order: index,
              createdAt: Date.now(),
              updatedAt: Date.now()
            });
          } catch (error) {
            console.warn('Skipping bookmark backup entry:', error);
          }
        });
    }

    if (!restored.collections.length) return null;

    restored.settings.defaultCollectionId = restored.collections[0].id;
    restored.settings.filterCollectionId = restored.collections[0].id;

    return normalizeState(restored);
  }

  function normalizeImportedPayload(payload) {
    if (Array.isArray(payload)) {
      return migrateLegacyState(payload, ctx.currentLang, ctx.state?.settings?.theme);
    }

    if (payload && typeof payload === 'object') {
      if (payload.state) return normalizeState(payload.state, ctx.currentLang, ctx.state?.settings?.theme);
      if (payload.collections || payload.links) return normalizeState(payload, ctx.currentLang, ctx.state?.settings?.theme);
    }

    throw new Error(deps.translate('importInvalid'));
  }

  return {
    createEmptyState,
    normalizeState,
    migrateLegacyState,
    reindexAllCollections,
    reindexCollection,
    loadAppState,
    persistState,
    syncBackupWithStatus,
    syncBookmarksBackup,
    restoreStateFromBookmarksBackup,
    normalizeImportedPayload
  };
}
