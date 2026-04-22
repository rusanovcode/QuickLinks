import { GITHUB_CONFIG, SOURCE_FILES } from './popup.js';

export function createUpdateService(ctx, deps) {
  async function checkForUpdates() {
    const button = ctx.elements.checkUpdateBtn;
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = deps.translate('checkingUpdates');

    try {
      const currentVersion = chrome.runtime.getManifest().version;
      const [remoteManifest, remoteFingerprint, localFingerprint, remoteCommit] = await Promise.all([
        fetchRemoteManifest(),
        fetchRemoteFingerprint(),
        fetchLocalFingerprint(),
        fetchRemoteCommitInfo()
      ]);

      const remoteVersion = remoteManifest?.version || currentVersion;
      const versionDiff = deps.compareVersions(remoteVersion, currentVersion);
      const codeChanged = Boolean(remoteFingerprint && localFingerprint && remoteFingerprint !== localFingerprint);

      if (versionDiff > 0 || codeChanged) {
        const lines = [
          `${deps.translate('currentVersion')}: ${currentVersion}`,
          `${deps.translate('remoteVersion')}: ${remoteVersion || deps.translate('versionUnchanged')}`
        ];

        if (codeChanged && versionDiff <= 0) {
          lines.push(deps.translate('updateAvailableSameVersion'));
        } else {
          lines.push(deps.translate('updateAvailable', { version: remoteVersion }));
        }

        if (remoteCommit?.date) {
          lines.push(`${deps.translate('remoteCommit')}: ${deps.formatDate(remoteCommit.date)}`);
        }

        ctx.elements.updateModalText.textContent = lines.join('\n');
        ctx.elements.updateModal.classList.remove('hidden');
      } else {
        deps.showToast(deps.translate('latestVersion'), 'success');
      }
    } catch (error) {
      console.error('Update check failed:', error);
      deps.showToast(deps.translate('updateError'), 'error');
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  }

  async function fetchRemoteManifest() {
    const manifestUrl = `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.manifestPath}?t=${Date.now()}`;
    const response = await fetch(manifestUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error('Remote manifest fetch failed');
    return response.json();
  }

  async function fetchRemoteFingerprint() {
    const responses = await Promise.all(SOURCE_FILES.map(async (filePath) => {
      const url = `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${filePath}?t=${Date.now()}`;
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Remote file fetch failed: ${filePath}`);
      return response.text();
    }));
    return createFingerprint(responses);
  }

  async function fetchLocalFingerprint() {
    const responses = await Promise.all(SOURCE_FILES.map(async (filePath) => {
      const response = await fetch(chrome.runtime.getURL(filePath), { cache: 'no-store' });
      if (!response.ok) throw new Error(`Local file fetch failed: ${filePath}`);
      return response.text();
    }));
    return createFingerprint(responses);
  }

  async function fetchRemoteCommitInfo() {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/commits/${GITHUB_CONFIG.branch}`;
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json'
      },
      cache: 'no-store'
    });

    if (!response.ok) return null;
    const data = await response.json();
    return {
      sha: data?.sha || null,
      date: data?.commit?.committer?.date || null
    };
  }

  async function createFingerprint(chunks) {
    const payload = chunks.join('\n---quick-links-source-boundary---\n');
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload));
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  function openRepository() {
    chrome.tabs.create({ url: GITHUB_CONFIG.repoUrl });
  }

  function downloadRepositoryZip() {
    const downloadUrl = `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/archive/refs/heads/${GITHUB_CONFIG.branch}.zip`;
    chrome.tabs.create({ url: downloadUrl });
  }

  return {
    checkForUpdates,
    openRepository,
    downloadRepositoryZip
  };
}
