import {
  ALL_COLLECTIONS_KEY,
  MAX_CUSTOM_ICON_BYTES,
  MAX_UI_SCALE,
  MIN_UI_SCALE,
  SCHEMA_VERSION,
  THEMES,
  UI_SCALE_STEP
} from './popup.js';

export function createActions(ctx, deps) {
  function bindEventListeners() {
    const { elements } = ctx;

    elements.langBtn.addEventListener('click', () => {
      toggleLanguage().catch(handleActionError);
    });

    elements.themeBtn.addEventListener('click', () => {
      cycleTheme().catch(handleActionError);
    });

    elements.zoomInBtn.addEventListener('click', () => {
      increaseUiScale().catch(handleActionError);
    });

    elements.zoomOutBtn.addEventListener('click', () => {
      decreaseUiScale().catch(handleActionError);
    });

    elements.searchInput.addEventListener('input', (event) => {
      ctx.searchQuery = event.target.value;
      deps.renderLinks();
      deps.renderStats();
    });

    elements.collectionFilter.addEventListener('change', () => {
      ctx.filterCollectionId = elements.collectionFilter.value;
      ctx.state.settings.filterCollectionId = ctx.filterCollectionId;
      if (ctx.filterCollectionId !== ALL_COLLECTIONS_KEY) {
        ctx.state.settings.defaultCollectionId = ctx.filterCollectionId;
      }
      deps.persistState({ syncBackup: false }).catch(handleActionError);
    });

    elements.favoritesToggleBtn.addEventListener('click', () => {
      ctx.showFavoritesOnly = !ctx.showFavoritesOnly;
      ctx.state.settings.showFavoritesOnly = ctx.showFavoritesOnly;
      deps.persistState({ syncBackup: false }).catch(handleActionError);
    });

    elements.quickAddCurrentBtn.addEventListener('click', () => {
      quickAddCurrentTab().catch(handleActionError);
    });

    elements.showAddBtn.addEventListener('click', () => openForm());
    elements.closeFormBtn.addEventListener('click', closeForm);
    elements.cancelBtn.addEventListener('click', closeForm);
    elements.saveBtn.addEventListener('click', () => {
      saveLink().catch(handleActionError);
    });
    elements.fillCurrentTabBtn.addEventListener('click', () => {
      fillFormFromCurrentTab().catch(handleActionError);
    });

    elements.optAuto.addEventListener('click', () => selectMode('auto'));
    elements.optPreset.addEventListener('click', (event) => {
      if (!event.target.closest('.preset-btn')) selectMode('preset');
    });
    elements.optCustom.addEventListener('click', () => selectMode('custom'));
    document.querySelectorAll('.preset-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        selectPreset(button.dataset.key);
      });
    });
    elements.pngInput.addEventListener('change', (event) => {
      handleFileUpload(event).catch(handleActionError);
    });

    elements.manageCollectionsBtn.addEventListener('click', openCollectionModal);
    elements.closeCollectionModalBtn.addEventListener('click', closeCollectionModal);
    elements.addCollectionBtn.addEventListener('click', () => {
      createCollectionFromInput().catch(handleActionError);
    });

    elements.exportBtn.addEventListener('click', () => {
      exportBackup().catch(handleActionError);
    });
    elements.exportInfoBtn.addEventListener('click', () => {
      toggleExportInfoPopover();
    });
    elements.importInput.addEventListener('change', (event) => {
      importBackup(event).catch(handleActionError);
    });

    elements.backupToggleBtn.addEventListener('click', toggleBackupStatus);

    elements.devLink.addEventListener('click', openDevModal);
    elements.closeDevModalBtn.addEventListener('click', closeDevModal);
    elements.copyEmailBtn.addEventListener('click', copyEmail);
    elements.openRepoFromDevBtn.addEventListener('click', deps.openRepository);

    elements.checkUpdateBtn.addEventListener('click', () => {
      deps.checkForUpdates().catch(handleActionError);
    });
    elements.githubFooterLink.addEventListener('click', deps.openRepository);
    elements.downloadUpdateBtn.addEventListener('click', deps.downloadRepositoryZip);
    elements.openRepoBtn.addEventListener('click', deps.openRepository);
    elements.closeUpdateBtn.addEventListener('click', closeUpdateModal);

    elements.undoBtn.addEventListener('click', () => {
      restoreDeletedLink().catch(handleActionError);
    });
    elements.closeUndoBtn.addEventListener('click', clearUndoBar);

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', deps.syncScrollableLayout);

    [elements.devModal, elements.updateModal, elements.collectionModal].forEach((modal) => {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.classList.add('hidden');
      });
    });
  }

  function toggleBackupStatus() {
    ctx.isBackupExpanded = !ctx.isBackupExpanded;
    deps.renderBackupStatus();
    deps.syncScrollableLayout();
  }

  function toggleExportInfoPopover() {
    const isHidden = ctx.elements.exportInfoPopover.classList.contains('hidden');
    clearTimeout(ctx.exportInfoTimer);

    if (!isHidden) {
      hideExportInfoPopover();
      return;
    }

    ctx.elements.exportInfoPopover.classList.remove('hidden');
    ctx.elements.exportInfoPopover.setAttribute('aria-hidden', 'false');
    ctx.elements.exportInfoBtn.setAttribute('aria-expanded', 'true');
    ctx.exportInfoTimer = window.setTimeout(() => {
      hideExportInfoPopover();
    }, 3200);
  }

  function hideExportInfoPopover() {
    ctx.elements.exportInfoPopover.classList.add('hidden');
    ctx.elements.exportInfoPopover.setAttribute('aria-hidden', 'true');
    ctx.elements.exportInfoBtn.setAttribute('aria-expanded', 'false');
  }

  function handleKeyDown(event) {
    const key = event.key.toLowerCase();

    if ((event.ctrlKey || event.metaKey) && key === 'k') {
      event.preventDefault();
      ctx.elements.searchInput.focus();
      ctx.elements.searchInput.select();
      return;
    }

    if (key === 'escape') {
      if (!ctx.elements.updateModal.classList.contains('hidden')) return closeUpdateModal();
      if (!ctx.elements.collectionModal.classList.contains('hidden')) return closeCollectionModal();
      if (!ctx.elements.devModal.classList.contains('hidden')) return closeDevModal();
      if (!ctx.elements.addForm.classList.contains('hidden')) return closeForm();
      if (!ctx.elements.undoBar.classList.contains('hidden')) return clearUndoBar();
      return;
    }

    if (event.key === 'Enter' && !ctx.elements.addForm.classList.contains('hidden') && document.activeElement === ctx.elements.siteUrl) {
      event.preventDefault();
      saveLink().catch(handleActionError);
    }
  }

  function openForm(linkId = null) {
    ctx.editingLinkId = linkId;
    ctx.elements.addForm.classList.remove('hidden');
    ctx.elements.formTitle.textContent = ctx.editingLinkId ? deps.translate('formEdit') : deps.translate('formNew');

    if (!linkId) {
      resetForm();
      ctx.elements.siteName.focus();
      deps.syncScrollableLayout();
      return;
    }

    const link = getLinkById(linkId);
    if (!link) return;

    ctx.elements.siteName.value = link.name;
    ctx.elements.siteUrl.value = link.url;
    ctx.elements.siteDesc.value = link.description;
    ctx.elements.formCollection.value = link.collectionId;
    ctx.elements.favoriteInput.checked = link.pinned;

    ctx.selectedMode = link.iconType === 'preset'
      ? 'preset'
      : link.iconType === 'custom'
        ? 'custom'
        : 'auto';
    ctx.selectedPreset = link.iconType === 'preset' ? link.iconData : null;
    ctx.customIconData = link.iconType === 'custom' ? link.iconData : null;

    document.querySelectorAll('.preset-btn').forEach((button) => {
      button.classList.toggle('active', button.dataset.key === ctx.selectedPreset);
    });

    setIconModeClasses();
    deps.updateSelectedInfo();
    ctx.elements.siteName.focus();
    deps.syncScrollableLayout();
  }

  function closeForm() {
    ctx.editingLinkId = null;
    ctx.elements.addForm.classList.add('hidden');
    resetForm();
    deps.syncScrollableLayout();
  }

  function resetForm() {
    ctx.elements.siteName.value = '';
    ctx.elements.siteUrl.value = '';
    ctx.elements.siteDesc.value = '';
    ctx.elements.favoriteInput.checked = false;
    ctx.elements.formCollection.value = getPreferredCollectionId();
    ctx.selectedMode = 'auto';
    ctx.selectedPreset = null;
    ctx.customIconData = null;
    document.querySelectorAll('.preset-btn').forEach((button) => button.classList.remove('active'));
    setIconModeClasses();
    deps.updateSelectedInfo();
  }

  function setIconModeClasses() {
    ctx.elements.optAuto.classList.toggle('active', ctx.selectedMode === 'auto');
    ctx.elements.optPreset.classList.toggle('active', ctx.selectedMode === 'preset');
    ctx.elements.optCustom.classList.toggle('active', ctx.selectedMode === 'custom');
  }

  function selectMode(mode) {
    ctx.selectedMode = mode;
    setIconModeClasses();
    deps.updateSelectedInfo();
  }

  function selectPreset(key) {
    ctx.selectedMode = 'preset';
    ctx.selectedPreset = key;
    setIconModeClasses();
    document.querySelectorAll('.preset-btn').forEach((button) => {
      button.classList.toggle('active', button.dataset.key === key);
    });
    deps.updateSelectedInfo();
  }

  async function handleFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/png') {
      throw new Error(deps.translate('pngOnly'));
    }

    if (file.size > MAX_CUSTOM_ICON_BYTES) {
      throw new Error(deps.translate('pngTooLarge'));
    }

    ctx.customIconData = await deps.readFileAsDataUrl(file);
    ctx.selectedMode = 'custom';
    setIconModeClasses();
    deps.updateSelectedInfo();
  }

  async function saveLink() {
    const name = ctx.elements.siteName.value.trim();
    const rawUrl = ctx.elements.siteUrl.value.trim();
    const description = ctx.elements.siteDesc.value.trim();

    if (!name || !rawUrl) {
      throw new Error(deps.translate('requiredFields'));
    }

    const collectionId = ctx.elements.formCollection.value || getPreferredCollectionId();
    const pinned = ctx.elements.favoriteInput.checked;
    const iconPayload = getSelectedIconPayload();
    const normalizedUrlData = deps.parseAndNormalizeUrl(rawUrl);

    const duplicate = ctx.state.links.find((link) =>
      link.id !== ctx.editingLinkId &&
      link.collectionId === collectionId &&
      link.normalizedUrl === normalizedUrlData.normalized
    );

    if (duplicate) {
      throw new Error(deps.translate('duplicateLink'));
    }

    const existing = ctx.editingLinkId ? getLinkById(ctx.editingLinkId) : null;
    const now = Date.now();

    const nextLink = {
      id: existing?.id || deps.createId('link'),
      collectionId,
      name,
      url: normalizedUrlData.url,
      normalizedUrl: normalizedUrlData.normalized,
      description,
      iconType: iconPayload.iconType,
      iconData: iconPayload.iconData,
      pinned,
      order: existing && existing.collectionId === collectionId
        ? existing.order
        : getCollectionLinks(collectionId).length,
      createdAt: existing?.createdAt || now,
      updatedAt: now
    };

    if (existing) {
      const previousCollectionId = existing.collectionId;
      ctx.state.links = ctx.state.links.map((link) => link.id === existing.id ? nextLink : link);
      deps.reindexCollection(previousCollectionId);
      deps.reindexCollection(collectionId);
    } else {
      ctx.state.links.push(nextLink);
      deps.reindexCollection(collectionId);
    }

    ctx.state.settings.defaultCollectionId = collectionId;
    if (ctx.filterCollectionId !== ALL_COLLECTIONS_KEY) {
      ctx.filterCollectionId = collectionId;
      ctx.state.settings.filterCollectionId = collectionId;
    }

    clearUndoBar();
    await deps.persistState({ syncBackup: true });
    closeForm();
  }

  function getSelectedIconPayload() {
    if (ctx.selectedMode === 'auto') {
      return { iconType: 'favicon', iconData: null };
    }

    if (ctx.selectedMode === 'preset') {
      if (!ctx.selectedPreset) throw new Error(deps.translate('selectPresetFirst'));
      return { iconType: 'preset', iconData: ctx.selectedPreset };
    }

    if (!ctx.customIconData) throw new Error(deps.translate('uploadPngFirst'));
    return { iconType: 'custom', iconData: ctx.customIconData };
  }

  async function deleteLink(linkId) {
    const link = getLinkById(linkId);
    if (!link) return;

    ctx.lastDeletedLink = { ...link };
    ctx.state.links = ctx.state.links.filter((item) => item.id !== linkId);
    deps.reindexCollection(link.collectionId);

    await deps.persistState({ syncBackup: true });
    showUndoBar();
  }

  async function restoreDeletedLink() {
    if (!ctx.lastDeletedLink) return;

    const fallbackCollectionId = ctx.state.collections.some((collection) => collection.id === ctx.lastDeletedLink.collectionId)
      ? ctx.lastDeletedLink.collectionId
      : getPreferredCollectionId();

    ctx.state.links.push({
      ...ctx.lastDeletedLink,
      collectionId: fallbackCollectionId,
      order: getCollectionLinks(fallbackCollectionId).length,
      updatedAt: Date.now()
    });

    deps.reindexCollection(fallbackCollectionId);
    clearUndoBar();
    await deps.persistState({
      syncBackup: true,
      toastKey: 'restoredDeleted'
    });
  }

  function showUndoBar() {
    clearTimeout(ctx.undoTimer);
    ctx.elements.undoText.textContent = deps.translate('undoDeleted');
    ctx.elements.undoBar.classList.remove('hidden');
    ctx.undoTimer = window.setTimeout(() => {
      clearUndoBar();
    }, 7000);
  }

  function clearUndoBar() {
    clearTimeout(ctx.undoTimer);
    ctx.elements.undoBar.classList.add('hidden');
    ctx.lastDeletedLink = null;
  }

  async function toggleFavorite(linkId) {
    const link = getLinkById(linkId);
    if (!link) return;

    link.pinned = !link.pinned;
    link.updatedAt = Date.now();

    await deps.persistState({
      syncBackup: true,
      toastKey: link.pinned ? 'favoriteSaved' : 'favoriteRemoved'
    });
  }

  async function quickAddCurrentTab() {
    const tab = await deps.getActiveTab();
    if (!tab?.url) {
      throw new Error(deps.translate('currentTabUnavailable'));
    }

    const collectionId = getPreferredCollectionId();
    const normalizedUrlData = deps.parseAndNormalizeUrl(tab.url);
    const duplicate = ctx.state.links.find((link) =>
      link.collectionId === collectionId &&
      link.normalizedUrl === normalizedUrlData.normalized
    );

    if (duplicate) {
      showToast(deps.translate('currentTabDuplicate'), 'warning');
      return;
    }

    ctx.state.links.push({
      id: deps.createId('link'),
      collectionId,
      name: tab.title?.trim() || deps.deriveNameFromUrl(tab.url),
      url: normalizedUrlData.url,
      normalizedUrl: normalizedUrlData.normalized,
      description: '',
      iconType: 'favicon',
      iconData: null,
      pinned: false,
      order: getCollectionLinks(collectionId).length,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    deps.reindexCollection(collectionId);
    ctx.state.settings.defaultCollectionId = collectionId;
    await deps.persistState({
      syncBackup: true,
      toastKey: 'currentTabSaved'
    });
  }

  async function fillFormFromCurrentTab() {
    const tab = await deps.getActiveTab();
    if (!tab?.url) {
      throw new Error(deps.translate('currentTabUnavailable'));
    }

    openForm(ctx.editingLinkId);
    ctx.elements.siteName.value = tab.title?.trim() || deps.deriveNameFromUrl(tab.url);
    ctx.elements.siteUrl.value = tab.url;
    if (!ctx.elements.formCollection.value) {
      ctx.elements.formCollection.value = getPreferredCollectionId();
    }
    showToast(deps.translate('currentTabFilled'), 'success');
  }

  function getVisibleLinks() {
    const query = ctx.searchQuery.trim().toLowerCase();
    const collectionOrder = new Map(ctx.state.collections.map((collection, index) => [collection.id, index]));

    return ctx.state.links
      .filter((link) => ctx.filterCollectionId === ALL_COLLECTIONS_KEY || link.collectionId === ctx.filterCollectionId)
      .filter((link) => !ctx.showFavoritesOnly || link.pinned)
      .filter((link) => {
        if (!query) return true;
        const haystack = `${link.name} ${link.url} ${link.description}`.toLowerCase();
        return haystack.includes(query);
      })
      .sort((a, b) => {
        const collectionDiff = (collectionOrder.get(a.collectionId) || 0) - (collectionOrder.get(b.collectionId) || 0);
        if (collectionDiff !== 0) return collectionDiff;
        return a.order - b.order;
      });
  }

  function canReorderVisibleList() {
    return ctx.filterCollectionId !== ALL_COLLECTIONS_KEY && !ctx.showFavoritesOnly && !ctx.searchQuery.trim();
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  async function handleDrop(targetLinkId) {
    if (!ctx.dragLinkId || ctx.dragLinkId === targetLinkId || !canReorderVisibleList()) return;

    const collectionId = ctx.filterCollectionId;
    const collectionLinks = getCollectionLinks(collectionId);
    const sourceIndex = collectionLinks.findIndex((link) => link.id === ctx.dragLinkId);
    const targetIndex = collectionLinks.findIndex((link) => link.id === targetLinkId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const reordered = [...collectionLinks];
    const [moved] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    reordered.forEach((link, index) => {
      const stateLink = getLinkById(link.id);
      if (stateLink) stateLink.order = index;
    });

    ctx.dragLinkId = null;
    await deps.persistState({ syncBackup: true });
  }

  async function createCollectionFromInput() {
    const name = ctx.elements.newCollectionName.value.trim();
    if (!name) throw new Error(deps.translate('collectionNameRequired'));

    if (ctx.state.collections.some((collection) => collection.name.toLowerCase() === name.toLowerCase())) {
      throw new Error(deps.translate('collectionExists'));
    }

    ctx.state.collections.push({
      id: deps.createId('collection'),
      name,
      createdAt: Date.now()
    });

    ctx.elements.newCollectionName.value = '';
    await deps.persistState({
      syncBackup: true,
      toastKey: 'collectionAdded',
      values: { name }
    });
    openCollectionModal();
  }

  async function renameCollection(collectionId) {
    const collection = getCollectionById(collectionId);
    if (!collection) return;

    const nextName = window.prompt(
      deps.translate('renameCollectionPrompt', { name: collection.name }),
      collection.name
    );

    if (nextName === null) return;

    const trimmed = nextName.trim();
    if (!trimmed) throw new Error(deps.translate('collectionNameRequired'));

    if (ctx.state.collections.some((item) => item.id !== collectionId && item.name.toLowerCase() === trimmed.toLowerCase())) {
      throw new Error(deps.translate('collectionExists'));
    }

    collection.name = trimmed;
    await deps.persistState({
      syncBackup: true,
      toastKey: 'collectionRenamed',
      values: { name: trimmed }
    });
    openCollectionModal();
  }

  async function setDefaultCollection(collectionId) {
    const collection = getCollectionById(collectionId);
    if (!collection) return;

    ctx.state.settings.defaultCollectionId = collectionId;
    if (ctx.filterCollectionId !== ALL_COLLECTIONS_KEY) {
      ctx.filterCollectionId = collectionId;
      ctx.state.settings.filterCollectionId = collectionId;
    }

    await deps.persistState({
      syncBackup: false,
      toastKey: 'defaultCollectionSaved',
      values: { name: collection.name }
    });
    openCollectionModal();
  }

  async function deleteCollection(collectionId) {
    if (ctx.state.collections.length === 1) {
      throw new Error(deps.translate('cannotDeleteLastCollection'));
    }

    const collection = getCollectionById(collectionId);
    const targetCollection = ctx.state.collections.find((item) => item.id !== collectionId);
    if (!collection || !targetCollection) return;

    const confirmed = window.confirm(
      deps.translate('deleteCollectionConfirm', {
        name: collection.name,
        target: targetCollection.name
      })
    );

    if (!confirmed) return;

    let nextOrder = getCollectionLinks(targetCollection.id).length;
    ctx.state.links.forEach((link) => {
      if (link.collectionId === collectionId) {
        link.collectionId = targetCollection.id;
        link.order = nextOrder;
        nextOrder += 1;
      }
    });

    ctx.state.collections = ctx.state.collections.filter((item) => item.id !== collectionId);
    deps.reindexCollection(targetCollection.id);

    if (ctx.state.settings.defaultCollectionId === collectionId) {
      ctx.state.settings.defaultCollectionId = targetCollection.id;
    }

    if (ctx.filterCollectionId === collectionId) {
      ctx.filterCollectionId = targetCollection.id;
      ctx.state.settings.filterCollectionId = targetCollection.id;
    }

    await deps.persistState({
      syncBackup: true,
      toastKey: 'collectionDeleted',
      values: { name: collection.name }
    });
    openCollectionModal();
  }

  async function exportBackup() {
    const exportPayload = {
      source: 'Quick Links Menu',
      schemaVersion: SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      state: ctx.state
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `quick-links-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(deps.translate('exportDone'), 'success');
  }

  async function importBackup(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      if (!window.confirm(deps.translate('importReplaceConfirm'))) return;

      ctx.state = deps.normalizeImportedPayload(json);
      ctx.currentLang = ctx.state.settings.lang;
      ctx.currentThemeIndex = deps.getThemeIndex(ctx.state.settings.theme);
      ctx.filterCollectionId = ctx.state.settings.filterCollectionId;
      ctx.showFavoritesOnly = Boolean(ctx.state.settings.showFavoritesOnly);
      ctx.editingLinkId = null;
      ctx.searchQuery = '';
      ctx.elements.searchInput.value = '';
      clearUndoBar();
      closeForm();

      await deps.persistState({
        syncBackup: true,
        toastKey: 'importDone'
      });
    } catch (error) {
      console.error('Import failed:', error);
      showToast(error.message || deps.translate('importFailed'), 'error');
    } finally {
      event.target.value = '';
    }
  }

  function openDevModal() {
    ctx.elements.devModal.classList.remove('hidden');
  }

  function closeDevModal() {
    ctx.elements.devModal.classList.add('hidden');
  }

  function openCollectionModal() {
    ctx.elements.collectionModal.classList.remove('hidden');
    deps.renderCollectionManager();
    window.setTimeout(() => ctx.elements.newCollectionName.focus(), 0);
  }

  function closeCollectionModal() {
    ctx.elements.collectionModal.classList.add('hidden');
  }

  function closeUpdateModal() {
    ctx.elements.updateModal.classList.add('hidden');
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('rusanov.code@gmail.com');
      showToast(deps.translate('copied'), 'success');
    } catch (error) {
      console.error('Copy failed:', error);
      showToast(deps.translate('copyFailed'), 'error');
    }
  }

  async function toggleLanguage() {
    ctx.backupFeedback = { text: '', tone: 'neutral' };
    ctx.state.settings.lang = ctx.currentLang === 'ru' ? 'en' : 'ru';
    await deps.persistState({ syncBackup: false });
  }

  async function cycleTheme() {
    ctx.currentThemeIndex = (ctx.currentThemeIndex + 1) % THEMES.length;
    ctx.state.settings.theme = THEMES[ctx.currentThemeIndex];
    await deps.persistState({ syncBackup: false });
  }

  async function increaseUiScale() {
    const nextScale = Math.min(MAX_UI_SCALE, Math.round((ctx.uiScale + UI_SCALE_STEP) * 10) / 10);
    if (nextScale === ctx.uiScale) return;
    ctx.uiScale = nextScale;
    ctx.state.settings.uiScale = nextScale;
    await deps.persistState({ syncBackup: false });
  }

  async function decreaseUiScale() {
    const nextScale = Math.max(MIN_UI_SCALE, Math.round((ctx.uiScale - UI_SCALE_STEP) * 10) / 10);
    if (nextScale === ctx.uiScale) return;
    ctx.uiScale = nextScale;
    ctx.state.settings.uiScale = nextScale;
    await deps.persistState({ syncBackup: false });
  }

  function showToast(message, tone = 'neutral') {
    clearTimeout(ctx.toastTimer);
    ctx.elements.toast.className = 'toast';
    if (tone !== 'neutral') ctx.elements.toast.classList.add(tone);
    ctx.elements.toastText.textContent = message;
    ctx.elements.toast.classList.remove('hidden');
    ctx.toastTimer = window.setTimeout(() => {
      ctx.elements.toast.classList.add('hidden');
    }, 3200);
  }

  function handleActionError(error) {
    console.error(error);
    showToast(error?.message || deps.translate('saveFailed'), 'error');
  }

  function getPreferredCollectionId() {
    if (ctx.filterCollectionId !== ALL_COLLECTIONS_KEY && ctx.state.collections.some((collection) => collection.id === ctx.filterCollectionId)) {
      return ctx.filterCollectionId;
    }

    if (ctx.state.collections.some((collection) => collection.id === ctx.state.settings.defaultCollectionId)) {
      return ctx.state.settings.defaultCollectionId;
    }

    return ctx.state.collections[0]?.id;
  }

  function getCollectionById(collectionId) {
    return ctx.state.collections.find((collection) => collection.id === collectionId) || null;
  }

  function getCollectionName(collectionId) {
    return getCollectionById(collectionId)?.name || (ctx.currentLang === 'ru' ? 'Без коллекции' : 'No collection');
  }

  function getCollectionLinks(collectionId) {
    return ctx.state.links
      .filter((link) => link.collectionId === collectionId)
      .sort((a, b) => a.order - b.order);
  }

  function getLinkById(linkId) {
    return ctx.state.links.find((link) => link.id === linkId) || null;
  }

  return {
    bindEventListeners,
    handleKeyDown,
    openForm,
    closeForm,
    resetForm,
    setIconModeClasses,
    selectMode,
    selectPreset,
    handleFileUpload,
    saveLink,
    deleteLink,
    restoreDeletedLink,
    showUndoBar,
    clearUndoBar,
    toggleFavorite,
    quickAddCurrentTab,
    fillFormFromCurrentTab,
    getVisibleLinks,
    canReorderVisibleList,
    handleDragOver,
    handleDrop,
    createCollectionFromInput,
    renameCollection,
    setDefaultCollection,
    deleteCollection,
    exportBackup,
    importBackup,
    openDevModal,
    closeDevModal,
    openCollectionModal,
    closeCollectionModal,
    closeUpdateModal,
    copyEmail,
    toggleLanguage,
    cycleTheme,
    increaseUiScale,
    decreaseUiScale,
    showToast,
    handleActionError,
    getPreferredCollectionId,
    getCollectionById,
    getCollectionName,
    getCollectionLinks,
    getLinkById
  };
}
