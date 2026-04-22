import { ALL_COLLECTIONS_KEY, MAX_UI_SCALE, MIN_UI_SCALE, THEMES, THEME_LABELS } from './popup.js';

export function createRenderer(ctx, deps) {
  function cacheElements() {
    const ids = [
      'appShell', 'appTitle', 'appSubtitle', 'langBtn', 'themeBtn', 'zoomInBtn', 'zoomOutBtn', 'searchInput', 'collectionFilter',
      'favoritesToggleBtn', 'quickAddCurrentBtn', 'showAddBtn', 'manageCollectionsBtn',
      'exportBtn', 'exportInfoBtn', 'exportInfoPopover', 'importBtnText', 'importInput', 'backupTitle', 'backupToggleBtn', 'backupStatus', 'backupHint',
      'statsText', 'keyboardHint', 'addForm', 'formTitle', 'closeFormBtn', 'siteName',
      'siteUrl', 'siteDesc', 'collectionLabel', 'formCollection', 'favoriteInput',
      'favoriteLabel', 'iconLabel', 'optAuto', 'optPreset', 'optCustom', 'optAutoText',
      'optAutoHint', 'presetsLabel', 'presetsHint', 'uploadBtnText', 'uploadHint', 'pngInput',
      'selectedInfo', 'fillCurrentTabBtn', 'saveBtn', 'cancelBtn', 'linksList', 'devLink',
      'versionDisplay', 'checkUpdateBtn', 'githubFooterLink', 'devModal', 'devTitle',
      'devText', 'copyEmailBtn', 'devHint', 'openRepoFromDevBtn', 'closeDevModalBtn',
      'updateModal', 'updateModalTitle', 'updateModalText', 'downloadUpdateBtn', 'openRepoBtn',
      'closeUpdateBtn', 'collectionModal', 'collectionModalTitle', 'newCollectionName',
      'addCollectionBtn', 'collectionManageList', 'closeCollectionModalBtn', 'undoBar',
      'undoText', 'undoBtn', 'closeUndoBtn', 'toast', 'toastText'
    ];

    ctx.elements = ids.reduce((result, id) => {
      result[id] = document.getElementById(id);
      return result;
    }, {});
  }

  function renderAll() {
    updateStaticText();
    renderCollectionFilter();
    renderFormCollections();
    renderCollectionManager();
    updateSelectedInfo();
    renderBackupStatus();
    renderStats();
    renderLinks();
    syncScrollableLayout();
  }

  function updateStaticText() {
    const { elements } = ctx;

    document.documentElement.lang = ctx.currentLang;

    elements.appTitle.textContent = deps.translate('appTitle');
    elements.appSubtitle.textContent = deps.translate('appSubtitle');
    elements.appTitle.title = deps.translate('appSubtitle');
    elements.appTitle.setAttribute('aria-label', `${deps.translate('appTitle')}. ${deps.translate('appSubtitle')}`);
    elements.langBtn.textContent = ctx.currentLang.toUpperCase();
    elements.langBtn.title = ctx.currentLang === 'ru' ? 'Переключить язык' : 'Switch language';

    const themeLabel = THEME_LABELS[ctx.currentThemeIndex];
    const themeName = deps.translate(['themeLight', 'themeSystem', 'themeDark'][ctx.currentThemeIndex] || 'themeSystem');
    elements.themeBtn.textContent = themeLabel;
    elements.themeBtn.title = themeName || THEMES[ctx.currentThemeIndex];
    elements.zoomInBtn.title = ctx.currentLang === 'ru' ? '\u0423\u0432\u0435\u043b\u0438\u0447\u0438\u0442\u044c \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441' : 'Increase interface size';
    elements.zoomOutBtn.title = ctx.currentLang === 'ru' ? '\u0423\u043c\u0435\u043d\u044c\u0448\u0438\u0442\u044c \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441' : 'Decrease interface size';
    elements.zoomInBtn.setAttribute('aria-label', elements.zoomInBtn.title);
    elements.zoomOutBtn.setAttribute('aria-label', elements.zoomOutBtn.title);
    elements.zoomInBtn.disabled = ctx.uiScale >= MAX_UI_SCALE;
    elements.zoomOutBtn.disabled = ctx.uiScale <= MIN_UI_SCALE;

    elements.searchInput.placeholder = deps.translate('searchPlaceholder');
    elements.favoritesToggleBtn.textContent = ctx.showFavoritesOnly ? deps.translate('favoritesOn') : deps.translate('favoritesOff');
    elements.quickAddCurrentBtn.textContent = deps.translate('saveTab');
    elements.showAddBtn.textContent = deps.translate('newLink');
    elements.manageCollectionsBtn.textContent = deps.translate('collections');
    elements.exportBtn.textContent = deps.translate('exportJson');
    elements.importBtnText.textContent = deps.translate('importJson');
    elements.exportInfoBtn.textContent = '!';
    elements.exportInfoBtn.title = deps.translate('exportInfoLabel');
    elements.exportInfoBtn.setAttribute('aria-label', deps.translate('exportInfoLabel'));
    elements.exportInfoPopover.textContent = deps.translate('exportInfoNotice');
    elements.backupTitle.textContent = deps.translate('backupTitle');
    if (elements.backupHint) elements.backupHint.textContent = deps.translate('backupHint');
    if (elements.keyboardHint) {
      elements.keyboardHint.textContent = deps.canReorderVisibleList() ? deps.translate('reorderHint') : deps.translate('keyboardHint');
    }

    elements.formTitle.textContent = ctx.editingLinkId ? deps.translate('formEdit') : deps.translate('formNew');
    elements.siteName.placeholder = deps.translate('namePlaceholder');
    elements.siteUrl.placeholder = deps.translate('urlPlaceholder');
    elements.siteDesc.placeholder = deps.translate('descPlaceholder');
    elements.collectionLabel.textContent = deps.translate('collection');
    elements.favoriteLabel.textContent = deps.translate('favorite');
    elements.iconLabel.textContent = deps.translate('icon');
    elements.optAutoText.textContent = deps.translate('autoIcon');
    if (elements.optAutoHint) elements.optAutoHint.textContent = deps.translate('autoIconHint');
    elements.presetsLabel.textContent = deps.translate('presets');
    if (elements.presetsHint) elements.presetsHint.textContent = deps.translate('presetsHint');
    elements.uploadBtnText.textContent = deps.translate('uploadPng');
    if (elements.uploadHint) elements.uploadHint.textContent = deps.translate('uploadHint');
    elements.fillCurrentTabBtn.textContent = deps.translate('useCurrentTab');
    elements.saveBtn.textContent = deps.translate('save');
    elements.cancelBtn.textContent = deps.translate('cancel');

    elements.devLink.textContent = 'Rusanov';
    elements.devTitle.textContent = deps.translate('devTitle');
    elements.devText.textContent = deps.translate('devText');
    elements.copyEmailBtn.textContent = deps.translate('copy');
    elements.devHint.textContent = deps.translate('devHint');
    elements.openRepoFromDevBtn.textContent = deps.translate('github');
    elements.closeDevModalBtn.textContent = deps.translate('close');

    elements.checkUpdateBtn.textContent = deps.translate('checkUpdates');
    elements.githubFooterLink.textContent = deps.translate('github');
    elements.updateModalTitle.textContent = deps.translate('updateStatusTitle');
    elements.downloadUpdateBtn.textContent = deps.translate('downloadZip');
    elements.openRepoBtn.textContent = deps.translate('openGithub');
    elements.closeUpdateBtn.textContent = deps.translate('close');

    elements.collectionModalTitle.textContent = deps.translate('collectionModalTitle');
    elements.newCollectionName.placeholder = deps.translate('newCollectionPlaceholder');
    elements.addCollectionBtn.textContent = deps.translate('addCollection');
    elements.closeCollectionModalBtn.textContent = deps.translate('close');

    elements.undoText.textContent = deps.translate('undoDeleted');
    elements.undoBtn.textContent = deps.translate('undo');
    elements.closeUndoBtn.textContent = deps.translate('undoDismiss');
  }

  function renderCollectionFilter() {
    const { elements } = ctx;
    const previous = ctx.filterCollectionId;
    elements.collectionFilter.innerHTML = '';

    const allOption = document.createElement('option');
    allOption.value = ALL_COLLECTIONS_KEY;
    allOption.textContent = deps.translate('allCollections');
    elements.collectionFilter.appendChild(allOption);

    ctx.state.collections.forEach((collection) => {
      const option = document.createElement('option');
      option.value = collection.id;
      option.textContent = collection.name;
      elements.collectionFilter.appendChild(option);
    });

    if (!ctx.state.collections.some((collection) => collection.id === previous) && previous !== ALL_COLLECTIONS_KEY) {
      ctx.filterCollectionId = ctx.state.settings.defaultCollectionId;
      ctx.state.settings.filterCollectionId = ctx.filterCollectionId;
    }

    elements.collectionFilter.value = ctx.filterCollectionId;
  }

  function renderFormCollections() {
    const { elements } = ctx;
    const previous = elements.formCollection.value;
    elements.formCollection.innerHTML = '';

    ctx.state.collections.forEach((collection) => {
      const option = document.createElement('option');
      option.value = collection.id;
      option.textContent = collection.name;
      elements.formCollection.appendChild(option);
    });

    if (ctx.state.collections.some((collection) => collection.id === previous)) {
      elements.formCollection.value = previous;
      return;
    }

    elements.formCollection.value = deps.getPreferredCollectionId();
  }

  function renderCollectionManager() {
    const { elements } = ctx;
    elements.collectionManageList.innerHTML = '';

    ctx.state.collections.forEach((collection) => {
      const row = document.createElement('div');
      row.className = 'collection-row';

      const copy = document.createElement('div');
      copy.className = 'collection-copy';

      const name = document.createElement('div');
      name.className = 'collection-name';
      name.textContent = collection.name;

      const meta = document.createElement('div');
      meta.className = 'collection-meta';

      const countChip = document.createElement('span');
      countChip.className = 'meta-chip';
      countChip.textContent = deps.translate('linksCount', {
        count: String(deps.getCollectionLinks(collection.id).length)
      });
      meta.appendChild(countChip);

      if (collection.id === ctx.state.settings.defaultCollectionId) {
        const defaultChip = document.createElement('span');
        defaultChip.className = 'meta-chip collection-chip';
        defaultChip.textContent = deps.translate('collectionDefault');
        meta.appendChild(defaultChip);
      }

      if (collection.id === ctx.filterCollectionId) {
        const currentChip = document.createElement('span');
        currentChip.className = 'meta-chip';
        currentChip.textContent = deps.translate('collectionCurrent');
        meta.appendChild(currentChip);
      }

      copy.appendChild(name);
      copy.appendChild(meta);

      const actions = document.createElement('div');
      actions.className = 'collection-actions';

      const defaultButton = document.createElement('button');
      defaultButton.className = 'btn btn-secondary collection-action-btn';
      defaultButton.type = 'button';
      defaultButton.textContent = deps.translate('setDefault');
      defaultButton.disabled = collection.id === ctx.state.settings.defaultCollectionId;
      defaultButton.addEventListener('click', () => {
        deps.setDefaultCollection(collection.id).catch(deps.handleActionError);
      });

      const renameButton = document.createElement('button');
      renameButton.className = 'btn btn-secondary collection-action-btn';
      renameButton.type = 'button';
      renameButton.textContent = deps.translate('rename');
      renameButton.addEventListener('click', () => {
        deps.renameCollection(collection.id).catch(deps.handleActionError);
      });

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger collection-action-btn';
      deleteButton.type = 'button';
      deleteButton.textContent = deps.translate('deleteCollection');
      deleteButton.addEventListener('click', () => {
        deps.deleteCollection(collection.id).catch(deps.handleActionError);
      });

      actions.appendChild(defaultButton);
      actions.appendChild(renameButton);
      actions.appendChild(deleteButton);

      row.appendChild(copy);
      row.appendChild(actions);
      elements.collectionManageList.appendChild(row);
    });
  }

  function renderStats() {
    if (!ctx.elements.statsText && !ctx.elements.keyboardHint) return;
    const visibleLinks = deps.getVisibleLinks();
    if (ctx.elements.statsText) {
      ctx.elements.statsText.textContent = deps.translate('statsText', {
        visible: String(visibleLinks.length),
        total: String(ctx.state.links.length)
      });
    }
    if (ctx.elements.keyboardHint) {
      ctx.elements.keyboardHint.textContent = deps.canReorderVisibleList() ? deps.translate('reorderHint') : deps.translate('keyboardHint');
    }
  }

  function syncScrollableLayout() {
    if (ctx.layoutFrame) {
      window.cancelAnimationFrame(ctx.layoutFrame);
    }

    ctx.layoutFrame = window.requestAnimationFrame(() => {
      const { appShell } = ctx.elements;
      if (!appShell) return;

      const bodyStyle = window.getComputedStyle(document.body);
      const bodyVerticalPadding = readPx(bodyStyle.paddingTop) + readPx(bodyStyle.paddingBottom);
      const screenHeight = window.screen?.availHeight || window.innerHeight || 800;
      const popupMaxOuterHeight = Math.max(344, Math.floor(screenHeight * 0.8));
      const popupMaxInnerHeight = Math.max(320, popupMaxOuterHeight - bodyVerticalPadding);

      document.documentElement.style.setProperty('--popup-max-height', `${popupMaxInnerHeight}px`);
      document.documentElement.style.setProperty('--popup-outer-max-height', `${popupMaxOuterHeight}px`);
      document.documentElement.style.maxHeight = `${popupMaxOuterHeight}px`;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.maxHeight = `${popupMaxOuterHeight}px`;
      document.body.style.overflow = 'hidden';

      appShell.style.removeProperty('height');
      appShell.style.removeProperty('min-height');
      appShell.style.removeProperty('max-height');
      appShell.style.maxHeight = `${popupMaxInnerHeight}px`;

      const naturalShellHeight = appShell.scrollHeight;
      const targetShellHeight = Math.min(naturalShellHeight, popupMaxInnerHeight);
      const targetOuterHeight = targetShellHeight + bodyVerticalPadding;

      if (naturalShellHeight <= popupMaxInnerHeight) {
        document.documentElement.style.height = `${targetOuterHeight}px`;
        document.body.style.height = `${targetOuterHeight}px`;
        appShell.style.height = 'auto';
        return;
      }

      document.documentElement.style.height = `${popupMaxOuterHeight}px`;
      document.body.style.height = `${popupMaxOuterHeight}px`;
      appShell.style.height = `${popupMaxInnerHeight}px`;
      appShell.style.maxHeight = `${popupMaxInnerHeight}px`;
      appShell.style.overflow = 'hidden';
    });
  }

  function readPx(value) {
    return Number.parseFloat(value || '0') || 0;
  }

    function renderBackupStatus() {
    const isExpanded = Boolean(ctx.isBackupExpanded);
    const shouldShowStatus = isExpanded || ctx.backupFeedback.tone === 'warning';
    const toggleTitle = ctx.currentLang === 'ru'
      ? (isExpanded ? 'Свернуть описание' : 'Развернуть описание')
      : (isExpanded ? 'Collapse description' : 'Expand description');

    ctx.elements.backupToggleBtn.textContent = isExpanded ? '⇑' : '⇓';
    ctx.elements.backupToggleBtn.title = toggleTitle;
    ctx.elements.backupToggleBtn.setAttribute('aria-label', toggleTitle);
    ctx.elements.backupToggleBtn.setAttribute('aria-expanded', String(isExpanded));

    ctx.elements.backupStatus.className = 'hint-text';
    if (ctx.backupFeedback.text) {
      ctx.elements.backupStatus.textContent = ctx.backupFeedback.text;
      if (ctx.backupFeedback.tone === 'success') ctx.elements.backupStatus.classList.add('success');
      if (ctx.backupFeedback.tone === 'warning') ctx.elements.backupStatus.classList.add('warning');
      ctx.elements.backupStatus.classList.toggle('hidden', !shouldShowStatus);
      return;
    }

    ctx.elements.backupStatus.textContent = deps.translate('backupStatus');
    ctx.elements.backupStatus.classList.toggle('hidden', !shouldShowStatus);
  }

  function renderLinks() {
    const { elements } = ctx;
    const visibleLinks = deps.getVisibleLinks();
    elements.linksList.innerHTML = '';

    if (!visibleLinks.length) {
      elements.linksList.appendChild(createEmptyStateNode(Boolean(ctx.searchQuery.trim()) || ctx.showFavoritesOnly));
      return;
    }

    const canReorder = deps.canReorderVisibleList();

    visibleLinks.forEach((link) => {
      const item = document.createElement('article');
      item.className = 'link-item';
      item.dataset.linkId = link.id;

      if (canReorder) {
        item.addEventListener('dragover', deps.handleDragOver);
        item.addEventListener('dragenter', () => {
          if (ctx.dragLinkId && ctx.dragLinkId !== link.id) item.classList.add('drag-over');
        });
        item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
        item.addEventListener('drop', (event) => {
          event.preventDefault();
          deps.handleDrop(link.id).catch(deps.handleActionError);
        });
      }

      const icon = document.createElement('img');
      icon.className = 'link-icon';
      icon.alt = '';
      icon.src = deps.getIconSrc(link);
      icon.addEventListener('error', () => {
        icon.src = deps.createFallbackIconData(link.name, link.url);
      });

      const main = document.createElement('div');
      main.className = 'link-main';

      const openButton = document.createElement('button');
      openButton.className = 'link-open';
      openButton.type = 'button';
      openButton.title = deps.translate('openLink');
      openButton.addEventListener('click', () => deps.openLink(link.url));

      const name = document.createElement('div');
      name.className = 'link-name';
      name.textContent = link.name;
      openButton.appendChild(name);

      const meta = document.createElement('div');
      meta.className = 'link-meta';

      if (ctx.filterCollectionId === ALL_COLLECTIONS_KEY) {
        item.classList.add('has-collection-chip');
        const collectionChip = document.createElement('span');
        collectionChip.className = 'meta-chip collection-chip link-collection-chip';
        collectionChip.textContent = deps.getCollectionName(link.collectionId);
        meta.appendChild(collectionChip);
      }

      if (link.pinned) {
        const favoriteChip = document.createElement('span');
        favoriteChip.className = 'meta-chip';
        favoriteChip.textContent = ctx.currentLang === 'ru' ? 'избранное' : 'favorite';
        meta.appendChild(favoriteChip);
      }

      const description = document.createElement('div');
      description.className = 'link-description';
      description.textContent = link.description || '';

      main.appendChild(openButton);
      if (meta.childElementCount) main.appendChild(meta);
      if (link.description) main.appendChild(description);

      const actions = document.createElement('div');
      actions.className = 'link-actions';

      const favoriteButton = document.createElement('button');
      favoriteButton.className = `action-btn ${link.pinned ? 'favorite-active' : ''}`;
      favoriteButton.type = 'button';
      favoriteButton.title = link.pinned ? deps.translate('unpin') : deps.translate('pin');
      favoriteButton.textContent = link.pinned ? '★' : '☆';
      favoriteButton.addEventListener('click', () => {
        deps.toggleFavorite(link.id).catch(deps.handleActionError);
      });

      const editButton = document.createElement('button');
      editButton.className = 'action-btn';
      editButton.type = 'button';
      editButton.title = deps.translate('edit');
      editButton.textContent = 'E';
      editButton.addEventListener('click', () => deps.openForm(link.id));

      const deleteButton = document.createElement('button');
      deleteButton.className = 'action-btn danger';
      deleteButton.type = 'button';
      deleteButton.title = deps.translate('delete');
      deleteButton.textContent = 'X';
      deleteButton.addEventListener('click', () => {
        deps.deleteLink(link.id).catch(deps.handleActionError);
      });

      actions.appendChild(favoriteButton);
      actions.appendChild(editButton);
      actions.appendChild(deleteButton);

      if (canReorder) {
        const dragButton = document.createElement('button');
        dragButton.className = 'action-btn drag-btn';
        dragButton.type = 'button';
        dragButton.draggable = true;
        dragButton.title = deps.translate('drag');
        dragButton.textContent = '↕';
        dragButton.addEventListener('dragstart', () => {
          ctx.dragLinkId = link.id;
          item.classList.add('dragging');
        });
        dragButton.addEventListener('dragend', () => {
          ctx.dragLinkId = null;
          item.classList.remove('dragging');
          document.querySelectorAll('.link-item').forEach((node) => node.classList.remove('drag-over'));
        });
        actions.appendChild(dragButton);
      }

      item.appendChild(icon);
      item.appendChild(main);
      item.appendChild(actions);
      elements.linksList.appendChild(item);
    });
  }

  function createEmptyStateNode(isFiltered) {
    const container = document.createElement('div');
    container.className = 'empty-state';

    const title = document.createElement('h3');
    title.className = 'empty-title';
    title.textContent = isFiltered ? deps.translate('emptyNoResultsTitle') : deps.translate('emptyTitle');

    const text = document.createElement('p');
    text.className = 'empty-text';
    text.textContent = isFiltered ? deps.translate('emptyNoResultsText') : deps.translate('emptyText');

    container.appendChild(title);
    container.appendChild(text);
    return container;
  }

  function updateSelectedInfo() {
    let value = deps.translate('selectedAuto');
    if (ctx.selectedMode === 'preset') value = deps.translate('selectedPreset');
    if (ctx.selectedMode === 'custom') value = deps.translate('selectedCustom');
    ctx.elements.selectedInfo.textContent = `${deps.translate('selected')}: ${value}`;
  }

  function renderVersion() {
    ctx.elements.versionDisplay.textContent = `v${chrome.runtime.getManifest().version}`;
  }

  function applyUiScale() {
    const scaleValue = String(ctx.uiScale);
    document.documentElement.style.setProperty('--ui-scale', scaleValue);
    if (!ctx.elements.appShell) return;
    ctx.elements.appShell.style.setProperty('--ui-scale', scaleValue);
    ctx.elements.appShell.style.removeProperty('zoom');
    ctx.elements.appShell.style.removeProperty('width');
  }

  function applyTheme() {
    const theme = THEMES[ctx.currentThemeIndex];
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = theme === 'dark' || (theme === 'system' && prefersDark);
    document.body.setAttribute('data-theme', shouldUseDark ? 'dark' : 'light');
  }

  return {
    cacheElements,
    renderAll,
    updateStaticText,
    renderCollectionFilter,
    renderFormCollections,
    renderCollectionManager,
    renderStats,
    renderBackupStatus,
    renderLinks,
    syncScrollableLayout,
    updateSelectedInfo,
    renderVersion,
    applyUiScale,
    applyTheme
  };
}
