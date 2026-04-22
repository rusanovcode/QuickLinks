const STORAGE_KEY = 'quickLinksState';
const LEGACY_STORAGE_KEY = 'quickLinks';
const SCHEMA_VERSION = 2;
const ALL_COLLECTIONS_KEY = '__all__';
const BACKUP_ROOT_TITLE = 'Quick Links Menu Backup';
const MAX_CUSTOM_ICON_BYTES = 256 * 1024;
const SOURCE_FILES = ['manifest.json', 'popup.html', 'popup.js'];

const PRESETS = {
  star: {
    data: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23FFB800' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E"
  },
  robot: {
    data: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%2340C057' viewBox='0 0 24 24'%3E%3Cpath d='M9 3a3 3 0 00-3 3v9h2v5l6-2 6 2v-5h2V6a3 3 0 00-3-3H9zm0 2h6a1 1 0 011 1v6h-1v5l-4-1.5-4 1.5V7H8V6a1 1 0 011-1z'/%3E%3C/svg%3E"
  },
  cloud: {
    data: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%234A90E2' viewBox='0 0 24 24'%3E%3Cpath d='M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 16H5v-2h14v2zm0-4H5v-2h14v2zm0-4H5V5h14v6z'/%3E%3C/svg%3E"
  },
  link: {
    data: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23FA5252' viewBox='0 0 24 24'%3E%3Cpath d='M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2zm1 1v18h18V4H4zm11 3l-6 6h4v6h-4v-6H8l6-6z'/%3E%3C/svg%3E"
  }
};

const THEMES = ['light', 'system', 'dark'];
const THEME_LABELS = ['L', 'S', 'D'];

const GITHUB_CONFIG = {
  owner: 'rusanovcode',
  repo: 'QuickLinks',
  branch: 'main',
  manifestPath: 'manifest.json',
  repoUrl: 'https://github.com/rusanovcode/QuickLinks'
};

const TRANSLATIONS = {
  ru: {
    appTitle: 'Быстрые ссылки',
    appSubtitle: 'Коллекции, поиск, резервные копии и быстрый запуск важных страниц.',
    searchPlaceholder: 'Поиск по названию, URL или заметке',
    allCollections: 'Все коллекции',
    favoritesOn: 'Только избранное',
    favoritesOff: 'Избранное',
    saveTab: 'Сохранить вкладку',
    newLink: 'Новая ссылка',
    collections: 'Коллекции',
    exportJson: 'Экспорт JSON',
    importJson: 'Импорт JSON',
    backupTitle: 'Сохранность данных',
    backupStatus: 'Автобэкап сохраняет ссылки в закладки браузера, чтобы их можно было восстановить после переустановки.',
    backupHint: 'Экспорт JSON сохраняет заметки, кастомные иконки, избранное и коллекции в одном файле.',
    backupReadySuccess: 'Автобэкап в закладки обновлен.',
    backupSyncFailed: 'Автобэкап в закладки не обновился. JSON-экспорт по-прежнему доступен.',
    keyboardHint: 'Ctrl/Cmd + K для поиска',
    reorderHint: 'Перетаскивание доступно в одной коллекции без поиска',
    formNew: 'Новая ссылка',
    formEdit: 'Редактирование ссылки',
    namePlaceholder: 'Название',
    urlPlaceholder: 'URL (https://...)',
    descPlaceholder: 'Описание или заметка (необязательно)',
    collection: 'Коллекция',
    favorite: 'Избранное',
    icon: 'Иконка',
    autoIcon: 'Favicon браузера',
    autoIconHint: 'Использует встроенный кэш иконок Chrome, без внешнего сервиса.',
    presets: 'Пресеты',
    presetsHint: 'Выберите одну из встроенных иконок.',
    uploadPng: 'Загрузить PNG',
    uploadHint: 'Хранится локально и входит в JSON-экспорт.',
    selected: 'Выбрано',
    selectedAuto: 'favicon браузера',
    selectedPreset: 'пресет',
    selectedCustom: 'свой PNG',
    useCurrentTab: 'Текущая вкладка',
    save: 'Сохранить',
    cancel: 'Отмена',
    devTitle: 'Обратная связь и поддержка',
    devText: 'Если найдете баг, захотите новую функцию или заметите неудобство, можно написать напрямую.',
    copy: 'Копировать',
    copied: 'Скопировано',
    copyFailed: 'Не удалось скопировать',
    devHint: 'Подсказка: закладки Chrome защищают сами ссылки после удаления расширения, а JSON-экспорт сохраняет полные данные.',
    github: 'GitHub',
    close: 'Закрыть',
    checkUpdates: 'Проверить обновления',
    checkingUpdates: 'Проверяю...',
    downloadZip: 'Скачать ZIP',
    openGithub: 'Открыть GitHub',
    updateStatusTitle: 'Статус обновления',
    collectionModalTitle: 'Коллекции',
    newCollectionPlaceholder: 'Новая коллекция',
    addCollection: 'Добавить',
    undo: 'Отменить',
    undoDismiss: 'Скрыть',
    undoDeleted: 'Ссылка удалена',
    statsText: '{visible} из {total} ссылок',
    emptyTitle: 'Ссылок пока нет',
    emptyText: 'Добавьте первую ссылку вручную или сохраните текущую вкладку в один клик.',
    emptyNoResultsTitle: 'Ничего не найдено',
    emptyNoResultsText: 'Попробуйте другой запрос, коллекцию или выключите фильтр избранного.',
    openLink: 'Открыть',
    pin: 'В избранное',
    unpin: 'Убрать из избранного',
    edit: 'Редактировать',
    delete: 'Удалить',
    drag: 'Перетащить',
    collectionDefault: 'по умолчанию',
    collectionCurrent: 'сейчас выбрана',
    rename: 'Переименовать',
    setDefault: 'Сделать основной',
    deleteCollection: 'Удалить',
    linksCount: '{count} ссылок',
    cannotDeleteLastCollection: 'Нельзя удалить последнюю коллекцию.',
    deleteCollectionConfirm: 'Удалить коллекцию "{name}"? Ссылки будут перенесены в "{target}".',
    renameCollectionPrompt: 'Новое название для "{name}"',
    collectionAdded: 'Коллекция "{name}" создана.',
    collectionRenamed: 'Коллекция переименована в "{name}".',
    collectionDeleted: 'Коллекция "{name}" удалена.',
    collectionNameRequired: 'Введите название коллекции.',
    collectionExists: 'Коллекция с таким названием уже есть.',
    restoredFromBackupToast: 'Ссылки восстановлены из закладок браузера: {count}.',
    migratedLegacyToast: 'Старый формат данных перенесен в новую структуру.',
    exportDone: 'JSON-файл с резервной копией создан.',
    exportFailed: 'Не удалось создать JSON-экспорт.',
    importDone: 'Данные из JSON успешно импортированы.',
    importFailed: 'Не удалось импортировать JSON.',
    importInvalid: 'Файл не похож на резервную копию Quick Links.',
    importReplaceConfirm: 'Заменить текущие ссылки данными из файла?',
    requiredFields: 'Заполните название и URL.',
    invalidUrl: 'Некорректный URL.',
    unsupportedProtocol: 'Поддерживаются только http, https, chrome, edge, mailto и tel.',
    duplicateLink: 'Такая ссылка уже есть в этой коллекции.',
    pngOnly: 'Поддерживаются только PNG-файлы.',
    pngTooLarge: 'PNG слишком большой. Максимум 256 KB.',
    selectPresetFirst: 'Сначала выберите пресет.',
    uploadPngFirst: 'Сначала загрузите PNG.',
    currentTabUnavailable: 'Не удалось получить текущую вкладку.',
    currentTabSaved: 'Текущая вкладка сохранена.',
    currentTabFilled: 'Поля заполнены данными текущей вкладки.',
    currentTabDuplicate: 'Эта вкладка уже есть в текущей коллекции.',
    latestVersion: 'У вас уже актуальная версия.',
    updateAvailable: 'Доступно обновление до версии {version}.',
    updateAvailableSameVersion: 'На GitHub есть более свежий код, хотя номер версии не изменился.',
    updateError: 'Не удалось проверить обновления.',
    currentVersion: 'Текущая версия',
    remoteVersion: 'Версия на GitHub',
    remoteCommit: 'Последний коммит',
    versionUnchanged: 'Номер версии на GitHub не менялся',
    favoriteSaved: 'Ссылка добавлена в избранное.',
    favoriteRemoved: 'Ссылка убрана из избранного.',
    restoredDeleted: 'Ссылка восстановлена.',
    saveFailed: 'Не удалось сохранить изменения.',
    defaultCollectionSaved: 'Коллекция "{name}" теперь основная.',
    themeLight: 'Светлая тема',
    themeSystem: 'Системная тема',
    themeDark: 'Темная тема'
  },
  en: {
    appTitle: 'Quick Links',
    appSubtitle: 'Collections, search, backups, and fast launch for the pages you use most.',
    searchPlaceholder: 'Search by name, URL, or note',
    allCollections: 'All collections',
    favoritesOn: 'Favorites only',
    favoritesOff: 'Favorites',
    saveTab: 'Save Tab',
    newLink: 'New Link',
    collections: 'Collections',
    exportJson: 'Export JSON',
    importJson: 'Import JSON',
    backupTitle: 'Data Safety',
    backupStatus: 'Auto backup stores links in browser bookmarks so they can be restored after reinstall.',
    backupHint: 'JSON export keeps notes, custom icons, favorites, and collections in one file.',
    backupReadySuccess: 'Browser-bookmark backup is up to date.',
    backupSyncFailed: 'Browser-bookmark backup failed to update. JSON export is still available.',
    keyboardHint: 'Ctrl/Cmd + K to search',
    reorderHint: 'Drag-and-drop works in a single collection without search',
    formNew: 'New Link',
    formEdit: 'Edit Link',
    namePlaceholder: 'Name',
    urlPlaceholder: 'URL (https://...)',
    descPlaceholder: 'Description or note (optional)',
    collection: 'Collection',
    favorite: 'Favorite',
    icon: 'Icon',
    autoIcon: 'Chrome favicon',
    autoIconHint: 'Uses Chrome\'s built-in icon cache instead of an external service.',
    presets: 'Presets',
    presetsHint: 'Pick one of the bundled icons.',
    uploadPng: 'Upload PNG',
    uploadHint: 'Stored locally and included in JSON exports.',
    selected: 'Selected',
    selectedAuto: 'Chrome favicon',
    selectedPreset: 'preset icon',
    selectedCustom: 'custom PNG',
    useCurrentTab: 'Use Current Tab',
    save: 'Save',
    cancel: 'Cancel',
    devTitle: 'Feedback and support',
    devText: 'Ideas, bugs, and feature requests are all welcome.',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed',
    devHint: 'Tip: Chrome-bookmark backup preserves links after uninstall, while JSON export keeps full metadata.',
    github: 'GitHub',
    close: 'Close',
    checkUpdates: 'Check updates',
    checkingUpdates: 'Checking...',
    downloadZip: 'Download ZIP',
    openGithub: 'Open GitHub',
    updateStatusTitle: 'Update status',
    collectionModalTitle: 'Collections',
    newCollectionPlaceholder: 'New collection',
    addCollection: 'Add',
    undo: 'Undo',
    undoDismiss: 'Dismiss',
    undoDeleted: 'Link deleted',
    statsText: '{visible} of {total} links',
    emptyTitle: 'No links yet',
    emptyText: 'Add your first link manually or save the current tab with one click.',
    emptyNoResultsTitle: 'No matches found',
    emptyNoResultsText: 'Try a different query, collection, or turn off the favorites filter.',
    openLink: 'Open',
    pin: 'Add to favorites',
    unpin: 'Remove from favorites',
    edit: 'Edit',
    delete: 'Delete',
    drag: 'Drag',
    collectionDefault: 'default',
    collectionCurrent: 'currently selected',
    rename: 'Rename',
    setDefault: 'Set default',
    deleteCollection: 'Delete',
    linksCount: '{count} links',
    cannotDeleteLastCollection: 'You cannot delete the last collection.',
    deleteCollectionConfirm: 'Delete "{name}"? Its links will be moved to "{target}".',
    renameCollectionPrompt: 'New name for "{name}"',
    collectionAdded: 'Collection "{name}" created.',
    collectionRenamed: 'Collection renamed to "{name}".',
    collectionDeleted: 'Collection "{name}" deleted.',
    collectionNameRequired: 'Enter a collection name.',
    collectionExists: 'A collection with this name already exists.',
    restoredFromBackupToast: 'Links restored from browser bookmarks: {count}.',
    migratedLegacyToast: 'Legacy data was migrated into the new structure.',
    exportDone: 'JSON backup created.',
    exportFailed: 'Could not create the JSON backup.',
    importDone: 'JSON backup imported successfully.',
    importFailed: 'Could not import the JSON backup.',
    importInvalid: 'This file does not look like a Quick Links backup.',
    importReplaceConfirm: 'Replace the current links with the data from this file?',
    requiredFields: 'Fill in both name and URL.',
    invalidUrl: 'The URL is not valid.',
    unsupportedProtocol: 'Only http, https, chrome, edge, mailto, and tel are supported.',
    duplicateLink: 'That link already exists in this collection.',
    pngOnly: 'PNG files only.',
    pngTooLarge: 'PNG is too large. Max size is 256 KB.',
    selectPresetFirst: 'Choose a preset first.',
    uploadPngFirst: 'Upload a PNG first.',
    currentTabUnavailable: 'Could not read the current tab.',
    currentTabSaved: 'Current tab saved.',
    currentTabFilled: 'The form was filled with the current tab.',
    currentTabDuplicate: 'That tab already exists in the current collection.',
    latestVersion: 'You already have the latest version.',
    updateAvailable: 'Update available: version {version}.',
    updateAvailableSameVersion: 'GitHub contains newer code, even though the version number did not change.',
    updateError: 'Could not check for updates.',
    currentVersion: 'Current version',
    remoteVersion: 'GitHub version',
    remoteCommit: 'Latest commit',
    versionUnchanged: 'GitHub version number stayed the same',
    favoriteSaved: 'Link added to favorites.',
    favoriteRemoved: 'Link removed from favorites.',
    restoredDeleted: 'Link restored.',
    saveFailed: 'Could not save changes.',
    defaultCollectionSaved: '"{name}" is now the default collection.',
    themeLight: 'Light theme',
    themeSystem: 'System theme',
    themeDark: 'Dark theme'
  }
};

let state = null;
let currentLang = 'en';
let currentThemeIndex = 1;
let selectedMode = 'auto';
let selectedPreset = null;
let customIconData = null;
let editingLinkId = null;
let filterCollectionId = ALL_COLLECTIONS_KEY;
let showFavoritesOnly = false;
let searchQuery = '';
let dragLinkId = null;
let lastDeletedLink = null;
let bootNotice = '';
let backupFeedback = { text: '', tone: 'neutral' };
let toastTimer = null;
let undoTimer = null;
let elements = {};

document.addEventListener('DOMContentLoaded', () => {
  initApp().catch((error) => {
    console.error('Init failed:', error);
    alert(error?.message || 'Quick Links failed to initialize.');
  });
});

async function initApp() {
  cacheElements();
  bindEventListeners();

  state = await loadAppState();
  currentLang = state.settings.lang;
  currentThemeIndex = getThemeIndex(state.settings.theme);
  filterCollectionId = state.settings.filterCollectionId;
  showFavoritesOnly = Boolean(state.settings.showFavoritesOnly);

  applyTheme();
  renderVersion();
  await syncBackupWithStatus(false);
  renderAll();

  if (bootNotice) {
    showToast(bootNotice, 'success');
    bootNotice = '';
  }

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  if (media && media.addEventListener) {
    media.addEventListener('change', () => {
      if (state?.settings.theme === 'system') applyTheme();
    });
  }
}

function cacheElements() {
  const ids = [
    'appTitle', 'appSubtitle', 'langBtn', 'themeBtn', 'searchInput', 'collectionFilter',
    'favoritesToggleBtn', 'quickAddCurrentBtn', 'showAddBtn', 'manageCollectionsBtn',
    'exportBtn', 'importBtnText', 'importInput', 'backupTitle', 'backupStatus', 'backupHint',
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

  elements = ids.reduce((result, id) => {
    result[id] = document.getElementById(id);
    return result;
  }, {});
}

function bindEventListeners() {
  elements.langBtn.addEventListener('click', () => {
    toggleLanguage().catch(handleActionError);
  });

  elements.themeBtn.addEventListener('click', () => {
    cycleTheme().catch(handleActionError);
  });

  elements.searchInput.addEventListener('input', (event) => {
    searchQuery = event.target.value;
    renderLinks();
    renderStats();
  });

  elements.collectionFilter.addEventListener('change', () => {
    filterCollectionId = elements.collectionFilter.value;
    state.settings.filterCollectionId = filterCollectionId;
    if (filterCollectionId !== ALL_COLLECTIONS_KEY) {
      state.settings.defaultCollectionId = filterCollectionId;
    }
    persistState({ syncBackup: false }).catch(handleActionError);
  });

  elements.favoritesToggleBtn.addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly;
    state.settings.showFavoritesOnly = showFavoritesOnly;
    persistState({ syncBackup: false }).catch(handleActionError);
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
  elements.importInput.addEventListener('change', (event) => {
    importBackup(event).catch(handleActionError);
  });

  elements.devLink.addEventListener('click', openDevModal);
  elements.closeDevModalBtn.addEventListener('click', closeDevModal);
  elements.copyEmailBtn.addEventListener('click', copyEmail);
  elements.openRepoFromDevBtn.addEventListener('click', openRepository);

  elements.checkUpdateBtn.addEventListener('click', () => {
    checkForUpdates().catch(handleActionError);
  });
  elements.githubFooterLink.addEventListener('click', openRepository);
  elements.downloadUpdateBtn.addEventListener('click', downloadRepositoryZip);
  elements.openRepoBtn.addEventListener('click', openRepository);
  elements.closeUpdateBtn.addEventListener('click', closeUpdateModal);

  elements.undoBtn.addEventListener('click', () => {
    restoreDeletedLink().catch(handleActionError);
  });
  elements.closeUndoBtn.addEventListener('click', clearUndoBar);

  document.addEventListener('keydown', handleKeyDown);

  [elements.devModal, elements.updateModal, elements.collectionModal].forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.classList.add('hidden');
    });
  });
}

function handleKeyDown(event) {
  const key = event.key.toLowerCase();

  if ((event.ctrlKey || event.metaKey) && key === 'k') {
    event.preventDefault();
    elements.searchInput.focus();
    elements.searchInput.select();
    return;
  }

  if (key === 'escape') {
    if (!elements.updateModal.classList.contains('hidden')) return closeUpdateModal();
    if (!elements.collectionModal.classList.contains('hidden')) return closeCollectionModal();
    if (!elements.devModal.classList.contains('hidden')) return closeDevModal();
    if (!elements.addForm.classList.contains('hidden')) return closeForm();
    if (!elements.undoBar.classList.contains('hidden')) return clearUndoBar();
    return;
  }

  if (event.key === 'Enter' && !elements.addForm.classList.contains('hidden') && document.activeElement === elements.siteUrl) {
    event.preventDefault();
    saveLink().catch(handleActionError);
  }
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
    bootNotice = textFor(migrated.settings.lang, 'migratedLegacyToast');
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
    bootNotice = textFor(restored.settings.lang, 'restoredFromBackupToast', {
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
      showFavoritesOnly: false
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
      showFavoritesOnly: Boolean(rawState?.settings?.showFavoritesOnly)
    }
  };

  reindexAllCollections(normalized);
  return normalized;
}

function sanitizeStoredLink(link, options) {
  if (!link || typeof link !== 'object') return null;
  if (!link.url || !link.name) return null;

  try {
    const normalizedUrlData = parseAndNormalizeUrl(String(link.url));
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

function reindexAllCollections(targetState = state) {
  targetState.collections.forEach((collection) => reindexCollection(collection.id, targetState));
}

function reindexCollection(collectionId, targetState = state) {
  const collectionLinks = targetState.links
    .filter((link) => link.collectionId === collectionId)
    .sort((a, b) => a.order - b.order || a.createdAt - b.createdAt);

  collectionLinks.forEach((link, index) => {
    link.order = index;
  });
}

async function persistState(options = {}) {
  const {
    syncBackup = true,
    toastKey = null,
    toastTone = 'success',
    values = {}
  } = options;

  state = normalizeState(state);
  currentLang = state.settings.lang;
  currentThemeIndex = getThemeIndex(state.settings.theme);

  await storageSet({
    [STORAGE_KEY]: state,
    lang: state.settings.lang,
    theme: state.settings.theme
  });

  if (syncBackup) {
    await syncBackupWithStatus(true);
  }

  applyTheme();
  renderVersion();
  renderAll();

  if (toastKey) {
    showToast(translate(toastKey, values), toastTone);
  }
}

async function syncBackupWithStatus(showSuccess) {
  try {
    await syncBookmarksBackup(state);
    if (showSuccess) {
      backupFeedback = {
        text: translate('backupReadySuccess'),
        tone: 'success'
      };
    }
  } catch (error) {
    console.error('Backup sync failed:', error);
    backupFeedback = {
      text: translate('backupSyncFailed'),
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
          const normalizedUrlData = parseAndNormalizeUrl(bookmark.url);
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

function renderAll() {
  updateStaticText();
  renderCollectionFilter();
  renderFormCollections();
  renderCollectionManager();
  updateSelectedInfo();
  renderBackupStatus();
  renderStats();
  renderLinks();
}

function updateStaticText() {
  document.documentElement.lang = currentLang;

  elements.appTitle.textContent = translate('appTitle');
  elements.appSubtitle.textContent = translate('appSubtitle');
  elements.langBtn.textContent = currentLang.toUpperCase();
  elements.langBtn.title = currentLang === 'ru' ? 'Переключить язык' : 'Switch language';

  const themeLabel = THEME_LABELS[currentThemeIndex];
  const themeName = translate(['themeLight', 'themeSystem', 'themeDark'][currentThemeIndex] || 'themeSystem');
  elements.themeBtn.textContent = themeLabel;
  elements.themeBtn.title = themeName || THEMES[currentThemeIndex];

  elements.searchInput.placeholder = translate('searchPlaceholder');
  elements.favoritesToggleBtn.textContent = showFavoritesOnly ? translate('favoritesOn') : translate('favoritesOff');
  elements.quickAddCurrentBtn.textContent = translate('saveTab');
  elements.showAddBtn.textContent = translate('newLink');
  elements.manageCollectionsBtn.textContent = translate('collections');
  elements.exportBtn.textContent = translate('exportJson');
  elements.importBtnText.textContent = translate('importJson');
  elements.backupTitle.textContent = translate('backupTitle');
  elements.backupHint.textContent = translate('backupHint');
  elements.keyboardHint.textContent = canReorderVisibleList() ? translate('reorderHint') : translate('keyboardHint');

  elements.formTitle.textContent = editingLinkId ? translate('formEdit') : translate('formNew');
  elements.siteName.placeholder = translate('namePlaceholder');
  elements.siteUrl.placeholder = translate('urlPlaceholder');
  elements.siteDesc.placeholder = translate('descPlaceholder');
  elements.collectionLabel.textContent = translate('collection');
  elements.favoriteLabel.textContent = translate('favorite');
  elements.iconLabel.textContent = translate('icon');
  elements.optAutoText.textContent = translate('autoIcon');
  if (elements.optAutoHint) elements.optAutoHint.textContent = translate('autoIconHint');
  elements.presetsLabel.textContent = translate('presets');
  if (elements.presetsHint) elements.presetsHint.textContent = translate('presetsHint');
  elements.uploadBtnText.textContent = translate('uploadPng');
  if (elements.uploadHint) elements.uploadHint.textContent = translate('uploadHint');
  elements.fillCurrentTabBtn.textContent = translate('useCurrentTab');
  elements.saveBtn.textContent = translate('save');
  elements.cancelBtn.textContent = translate('cancel');

  elements.devLink.textContent = 'Rusanov';
  elements.devTitle.textContent = translate('devTitle');
  elements.devText.textContent = translate('devText');
  elements.copyEmailBtn.textContent = translate('copy');
  elements.devHint.textContent = translate('devHint');
  elements.openRepoFromDevBtn.textContent = translate('github');
  elements.closeDevModalBtn.textContent = translate('close');

  elements.checkUpdateBtn.textContent = translate('checkUpdates');
  elements.githubFooterLink.textContent = translate('github');
  elements.updateModalTitle.textContent = translate('updateStatusTitle');
  elements.downloadUpdateBtn.textContent = translate('downloadZip');
  elements.openRepoBtn.textContent = translate('openGithub');
  elements.closeUpdateBtn.textContent = translate('close');

  elements.collectionModalTitle.textContent = translate('collectionModalTitle');
  elements.newCollectionName.placeholder = translate('newCollectionPlaceholder');
  elements.addCollectionBtn.textContent = translate('addCollection');
  elements.closeCollectionModalBtn.textContent = translate('close');

  elements.undoText.textContent = translate('undoDeleted');
  elements.undoBtn.textContent = translate('undo');
  elements.closeUndoBtn.textContent = translate('undoDismiss');
}

function renderCollectionFilter() {
  const previous = filterCollectionId;
  elements.collectionFilter.innerHTML = '';

  const allOption = document.createElement('option');
  allOption.value = ALL_COLLECTIONS_KEY;
  allOption.textContent = translate('allCollections');
  elements.collectionFilter.appendChild(allOption);

  state.collections.forEach((collection) => {
    const option = document.createElement('option');
    option.value = collection.id;
    option.textContent = collection.name;
    elements.collectionFilter.appendChild(option);
  });

  if (!state.collections.some((collection) => collection.id === previous) && previous !== ALL_COLLECTIONS_KEY) {
    filterCollectionId = state.settings.defaultCollectionId;
    state.settings.filterCollectionId = filterCollectionId;
  }

  elements.collectionFilter.value = filterCollectionId;
}

function renderFormCollections() {
  const previous = elements.formCollection.value;
  elements.formCollection.innerHTML = '';

  state.collections.forEach((collection) => {
    const option = document.createElement('option');
    option.value = collection.id;
    option.textContent = collection.name;
    elements.formCollection.appendChild(option);
  });

  if (state.collections.some((collection) => collection.id === previous)) {
    elements.formCollection.value = previous;
    return;
  }

  elements.formCollection.value = getPreferredCollectionId();
}

function renderCollectionManager() {
  elements.collectionManageList.innerHTML = '';

  state.collections.forEach((collection) => {
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
    countChip.textContent = translate('linksCount', {
      count: String(getCollectionLinks(collection.id).length)
    });
    meta.appendChild(countChip);

    if (collection.id === state.settings.defaultCollectionId) {
      const defaultChip = document.createElement('span');
      defaultChip.className = 'meta-chip collection-chip';
      defaultChip.textContent = translate('collectionDefault');
      meta.appendChild(defaultChip);
    }

    if (collection.id === filterCollectionId) {
      const currentChip = document.createElement('span');
      currentChip.className = 'meta-chip';
      currentChip.textContent = translate('collectionCurrent');
      meta.appendChild(currentChip);
    }

    copy.appendChild(name);
    copy.appendChild(meta);

    const actions = document.createElement('div');
    actions.className = 'collection-actions';

    const defaultButton = document.createElement('button');
    defaultButton.className = 'btn btn-secondary';
    defaultButton.type = 'button';
    defaultButton.textContent = translate('setDefault');
    defaultButton.disabled = collection.id === state.settings.defaultCollectionId;
    defaultButton.addEventListener('click', () => {
      setDefaultCollection(collection.id).catch(handleActionError);
    });

    const renameButton = document.createElement('button');
    renameButton.className = 'btn btn-secondary';
    renameButton.type = 'button';
    renameButton.textContent = translate('rename');
    renameButton.addEventListener('click', () => {
      renameCollection(collection.id).catch(handleActionError);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger';
    deleteButton.type = 'button';
    deleteButton.textContent = translate('deleteCollection');
    deleteButton.addEventListener('click', () => {
      deleteCollection(collection.id).catch(handleActionError);
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
  const visibleLinks = getVisibleLinks();
  elements.statsText.textContent = translate('statsText', {
    visible: String(visibleLinks.length),
    total: String(state.links.length)
  });
  elements.keyboardHint.textContent = canReorderVisibleList() ? translate('reorderHint') : translate('keyboardHint');
}

function renderBackupStatus() {
  elements.backupStatus.className = 'hint-text';
  if (backupFeedback.text) {
    elements.backupStatus.textContent = backupFeedback.text;
    if (backupFeedback.tone === 'success') elements.backupStatus.classList.add('success');
    if (backupFeedback.tone === 'warning') elements.backupStatus.classList.add('warning');
    return;
  }
  elements.backupStatus.textContent = translate('backupStatus');
}

function renderLinks() {
  const visibleLinks = getVisibleLinks();
  elements.linksList.innerHTML = '';

  if (!visibleLinks.length) {
    elements.linksList.appendChild(createEmptyStateNode(Boolean(searchQuery.trim()) || showFavoritesOnly));
    return;
  }

  const canReorder = canReorderVisibleList();

  visibleLinks.forEach((link) => {
    const item = document.createElement('article');
    item.className = 'link-item';
    item.dataset.linkId = link.id;

    if (canReorder) {
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('dragenter', () => {
        if (dragLinkId && dragLinkId !== link.id) item.classList.add('drag-over');
      });
      item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
      item.addEventListener('drop', (event) => {
        event.preventDefault();
        handleDrop(link.id).catch(handleActionError);
      });
    }

    const icon = document.createElement('img');
    icon.className = 'link-icon';
    icon.alt = '';
    icon.src = getIconSrc(link);
    icon.addEventListener('error', () => {
      icon.src = createFallbackIconData(link.name, link.url);
    });

    const main = document.createElement('div');
    main.className = 'link-main';

    const openButton = document.createElement('button');
    openButton.className = 'link-open';
    openButton.type = 'button';
    openButton.title = translate('openLink');
    openButton.addEventListener('click', () => openLink(link.url));

    const name = document.createElement('div');
    name.className = 'link-name';
    name.textContent = link.name;
    openButton.appendChild(name);

    const meta = document.createElement('div');
    meta.className = 'link-meta';

    const urlChip = document.createElement('span');
    urlChip.className = 'meta-chip';
    urlChip.textContent = formatUrlForDisplay(link.url);
    meta.appendChild(urlChip);

    if (filterCollectionId === ALL_COLLECTIONS_KEY) {
      const collectionChip = document.createElement('span');
      collectionChip.className = 'meta-chip collection-chip';
      collectionChip.textContent = getCollectionName(link.collectionId);
      meta.appendChild(collectionChip);
    }

    if (link.pinned) {
      const favoriteChip = document.createElement('span');
      favoriteChip.className = 'meta-chip';
      favoriteChip.textContent = currentLang === 'ru' ? 'избранное' : 'favorite';
      meta.appendChild(favoriteChip);
    }

    const description = document.createElement('div');
    description.className = 'link-description';
    description.textContent = link.description || '';

    main.appendChild(openButton);
    main.appendChild(meta);
    if (link.description) main.appendChild(description);

    const actions = document.createElement('div');
    actions.className = 'link-actions';

    const favoriteButton = document.createElement('button');
    favoriteButton.className = `action-btn ${link.pinned ? 'favorite-active' : ''}`;
    favoriteButton.type = 'button';
    favoriteButton.title = link.pinned ? translate('unpin') : translate('pin');
    favoriteButton.textContent = link.pinned ? '★' : '☆';
    favoriteButton.addEventListener('click', () => {
      toggleFavorite(link.id).catch(handleActionError);
    });

    const editButton = document.createElement('button');
    editButton.className = 'action-btn';
    editButton.type = 'button';
    editButton.title = translate('edit');
    editButton.textContent = 'E';
    editButton.addEventListener('click', () => openForm(link.id));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'action-btn danger';
    deleteButton.type = 'button';
    deleteButton.title = translate('delete');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
      deleteLink(link.id).catch(handleActionError);
    });

    actions.appendChild(favoriteButton);
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    if (canReorder) {
      const dragButton = document.createElement('button');
      dragButton.className = 'action-btn drag-btn';
      dragButton.type = 'button';
      dragButton.draggable = true;
      dragButton.title = translate('drag');
      dragButton.textContent = '↕';
      dragButton.addEventListener('dragstart', () => {
        dragLinkId = link.id;
        item.classList.add('dragging');
      });
      dragButton.addEventListener('dragend', () => {
        dragLinkId = null;
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
  title.textContent = isFiltered ? translate('emptyNoResultsTitle') : translate('emptyTitle');

  const text = document.createElement('p');
  text.className = 'empty-text';
  text.textContent = isFiltered ? translate('emptyNoResultsText') : translate('emptyText');

  container.appendChild(title);
  container.appendChild(text);
  return container;
}

function updateSelectedInfo() {
  let value = translate('selectedAuto');
  if (selectedMode === 'preset') value = translate('selectedPreset');
  if (selectedMode === 'custom') value = translate('selectedCustom');
  elements.selectedInfo.textContent = `${translate('selected')}: ${value}`;
}

function openForm(linkId = null) {
  editingLinkId = linkId;
  elements.addForm.classList.remove('hidden');
  elements.formTitle.textContent = editingLinkId ? translate('formEdit') : translate('formNew');

  if (!linkId) {
    resetForm();
    elements.siteName.focus();
    return;
  }

  const link = getLinkById(linkId);
  if (!link) return;

  elements.siteName.value = link.name;
  elements.siteUrl.value = link.url;
  elements.siteDesc.value = link.description;
  elements.formCollection.value = link.collectionId;
  elements.favoriteInput.checked = link.pinned;

  selectedMode = link.iconType === 'preset'
    ? 'preset'
    : link.iconType === 'custom'
      ? 'custom'
      : 'auto';
  selectedPreset = link.iconType === 'preset' ? link.iconData : null;
  customIconData = link.iconType === 'custom' ? link.iconData : null;

  document.querySelectorAll('.preset-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.key === selectedPreset);
  });

  setIconModeClasses();
  updateSelectedInfo();
  elements.siteName.focus();
}

function closeForm() {
  editingLinkId = null;
  elements.addForm.classList.add('hidden');
  resetForm();
}

function resetForm() {
  elements.siteName.value = '';
  elements.siteUrl.value = '';
  elements.siteDesc.value = '';
  elements.favoriteInput.checked = false;
  elements.formCollection.value = getPreferredCollectionId();
  selectedMode = 'auto';
  selectedPreset = null;
  customIconData = null;
  document.querySelectorAll('.preset-btn').forEach((button) => button.classList.remove('active'));
  setIconModeClasses();
  updateSelectedInfo();
}

function setIconModeClasses() {
  elements.optAuto.classList.toggle('active', selectedMode === 'auto');
  elements.optPreset.classList.toggle('active', selectedMode === 'preset');
  elements.optCustom.classList.toggle('active', selectedMode === 'custom');
}

function selectMode(mode) {
  selectedMode = mode;
  setIconModeClasses();
  updateSelectedInfo();
}

function selectPreset(key) {
  selectedMode = 'preset';
  selectedPreset = key;
  setIconModeClasses();
  document.querySelectorAll('.preset-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.key === key);
  });
  updateSelectedInfo();
}

async function handleFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (file.type !== 'image/png') {
    throw new Error(translate('pngOnly'));
  }

  if (file.size > MAX_CUSTOM_ICON_BYTES) {
    throw new Error(translate('pngTooLarge'));
  }

  customIconData = await readFileAsDataUrl(file);
  selectedMode = 'custom';
  setIconModeClasses();
  updateSelectedInfo();
}

async function saveLink() {
  const name = elements.siteName.value.trim();
  const rawUrl = elements.siteUrl.value.trim();
  const description = elements.siteDesc.value.trim();

  if (!name || !rawUrl) {
    throw new Error(translate('requiredFields'));
  }

  const collectionId = elements.formCollection.value || getPreferredCollectionId();
  const pinned = elements.favoriteInput.checked;
  const iconPayload = getSelectedIconPayload();
  const normalizedUrlData = parseAndNormalizeUrl(rawUrl);

  const duplicate = state.links.find((link) =>
    link.id !== editingLinkId &&
    link.collectionId === collectionId &&
    link.normalizedUrl === normalizedUrlData.normalized
  );

  if (duplicate) {
    throw new Error(translate('duplicateLink'));
  }

  const existing = editingLinkId ? getLinkById(editingLinkId) : null;
  const now = Date.now();

  const nextLink = {
    id: existing?.id || createId('link'),
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
    state.links = state.links.map((link) => link.id === existing.id ? nextLink : link);
    reindexCollection(previousCollectionId);
    reindexCollection(collectionId);
  } else {
    state.links.push(nextLink);
    reindexCollection(collectionId);
  }

  state.settings.defaultCollectionId = collectionId;
  if (filterCollectionId !== ALL_COLLECTIONS_KEY) {
    filterCollectionId = collectionId;
    state.settings.filterCollectionId = collectionId;
  }

  clearUndoBar();
  await persistState({ syncBackup: true });
  closeForm();
}

function getSelectedIconPayload() {
  if (selectedMode === 'auto') {
    return { iconType: 'favicon', iconData: null };
  }

  if (selectedMode === 'preset') {
    if (!selectedPreset) throw new Error(translate('selectPresetFirst'));
    return { iconType: 'preset', iconData: selectedPreset };
  }

  if (!customIconData) throw new Error(translate('uploadPngFirst'));
  return { iconType: 'custom', iconData: customIconData };
}

async function deleteLink(linkId) {
  const link = getLinkById(linkId);
  if (!link) return;

  lastDeletedLink = { ...link };
  state.links = state.links.filter((item) => item.id !== linkId);
  reindexCollection(link.collectionId);

  await persistState({ syncBackup: true });
  showUndoBar();
}

async function restoreDeletedLink() {
  if (!lastDeletedLink) return;

  const fallbackCollectionId = state.collections.some((collection) => collection.id === lastDeletedLink.collectionId)
    ? lastDeletedLink.collectionId
    : getPreferredCollectionId();

  state.links.push({
    ...lastDeletedLink,
    collectionId: fallbackCollectionId,
    order: getCollectionLinks(fallbackCollectionId).length,
    updatedAt: Date.now()
  });

  reindexCollection(fallbackCollectionId);
  clearUndoBar();
  await persistState({
    syncBackup: true,
    toastKey: 'restoredDeleted'
  });
}

function showUndoBar() {
  clearTimeout(undoTimer);
  elements.undoText.textContent = translate('undoDeleted');
  elements.undoBar.classList.remove('hidden');
  undoTimer = window.setTimeout(() => {
    clearUndoBar();
  }, 7000);
}

function clearUndoBar() {
  clearTimeout(undoTimer);
  elements.undoBar.classList.add('hidden');
  lastDeletedLink = null;
}

async function toggleFavorite(linkId) {
  const link = getLinkById(linkId);
  if (!link) return;

  link.pinned = !link.pinned;
  link.updatedAt = Date.now();

  await persistState({
    syncBackup: true,
    toastKey: link.pinned ? 'favoriteSaved' : 'favoriteRemoved'
  });
}

async function quickAddCurrentTab() {
  const tab = await getActiveTab();
  if (!tab?.url) {
    throw new Error(translate('currentTabUnavailable'));
  }

  const collectionId = getPreferredCollectionId();
  const normalizedUrlData = parseAndNormalizeUrl(tab.url);
  const duplicate = state.links.find((link) =>
    link.collectionId === collectionId &&
    link.normalizedUrl === normalizedUrlData.normalized
  );

  if (duplicate) {
    showToast(translate('currentTabDuplicate'), 'warning');
    return;
  }

  state.links.push({
    id: createId('link'),
    collectionId,
    name: tab.title?.trim() || deriveNameFromUrl(tab.url),
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

  reindexCollection(collectionId);
  state.settings.defaultCollectionId = collectionId;
  await persistState({
    syncBackup: true,
    toastKey: 'currentTabSaved'
  });
}

async function fillFormFromCurrentTab() {
  const tab = await getActiveTab();
  if (!tab?.url) {
    throw new Error(translate('currentTabUnavailable'));
  }

  openForm(editingLinkId);
  elements.siteName.value = tab.title?.trim() || deriveNameFromUrl(tab.url);
  elements.siteUrl.value = tab.url;
  if (!elements.formCollection.value) {
    elements.formCollection.value = getPreferredCollectionId();
  }
  showToast(translate('currentTabFilled'), 'success');
}

function getVisibleLinks() {
  const query = searchQuery.trim().toLowerCase();
  const collectionOrder = new Map(state.collections.map((collection, index) => [collection.id, index]));

  return state.links
    .filter((link) => filterCollectionId === ALL_COLLECTIONS_KEY || link.collectionId === filterCollectionId)
    .filter((link) => !showFavoritesOnly || link.pinned)
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
  return filterCollectionId !== ALL_COLLECTIONS_KEY && !showFavoritesOnly && !searchQuery.trim();
}

function handleDragOver(event) {
  event.preventDefault();
}

async function handleDrop(targetLinkId) {
  if (!dragLinkId || dragLinkId === targetLinkId || !canReorderVisibleList()) return;

  const collectionId = filterCollectionId;
  const collectionLinks = getCollectionLinks(collectionId);
  const sourceIndex = collectionLinks.findIndex((link) => link.id === dragLinkId);
  const targetIndex = collectionLinks.findIndex((link) => link.id === targetLinkId);

  if (sourceIndex === -1 || targetIndex === -1) return;

  const reordered = [...collectionLinks];
  const [moved] = reordered.splice(sourceIndex, 1);
  reordered.splice(targetIndex, 0, moved);
  reordered.forEach((link, index) => {
    const stateLink = getLinkById(link.id);
    if (stateLink) stateLink.order = index;
  });

  dragLinkId = null;
  await persistState({ syncBackup: true });
}

async function createCollectionFromInput() {
  const name = elements.newCollectionName.value.trim();
  if (!name) throw new Error(translate('collectionNameRequired'));

  if (state.collections.some((collection) => collection.name.toLowerCase() === name.toLowerCase())) {
    throw new Error(translate('collectionExists'));
  }

  state.collections.push({
    id: createId('collection'),
    name,
    createdAt: Date.now()
  });

  elements.newCollectionName.value = '';
  await persistState({
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
    translate('renameCollectionPrompt', { name: collection.name }),
    collection.name
  );

  if (nextName === null) return;

  const trimmed = nextName.trim();
  if (!trimmed) throw new Error(translate('collectionNameRequired'));

  if (state.collections.some((item) => item.id !== collectionId && item.name.toLowerCase() === trimmed.toLowerCase())) {
    throw new Error(translate('collectionExists'));
  }

  collection.name = trimmed;
  await persistState({
    syncBackup: true,
    toastKey: 'collectionRenamed',
    values: { name: trimmed }
  });
  openCollectionModal();
}

async function setDefaultCollection(collectionId) {
  const collection = getCollectionById(collectionId);
  if (!collection) return;

  state.settings.defaultCollectionId = collectionId;
  if (filterCollectionId !== ALL_COLLECTIONS_KEY) {
    filterCollectionId = collectionId;
    state.settings.filterCollectionId = collectionId;
  }

  await persistState({
    syncBackup: false,
    toastKey: 'defaultCollectionSaved',
    values: { name: collection.name }
  });
  openCollectionModal();
}

async function deleteCollection(collectionId) {
  if (state.collections.length === 1) {
    throw new Error(translate('cannotDeleteLastCollection'));
  }

  const collection = getCollectionById(collectionId);
  const targetCollection = state.collections.find((item) => item.id !== collectionId);
  if (!collection || !targetCollection) return;

  const confirmed = window.confirm(
    translate('deleteCollectionConfirm', {
      name: collection.name,
      target: targetCollection.name
    })
  );

  if (!confirmed) return;

  let nextOrder = getCollectionLinks(targetCollection.id).length;
  state.links.forEach((link) => {
    if (link.collectionId === collectionId) {
      link.collectionId = targetCollection.id;
      link.order = nextOrder;
      nextOrder += 1;
    }
  });

  state.collections = state.collections.filter((item) => item.id !== collectionId);
  reindexCollection(targetCollection.id);

  if (state.settings.defaultCollectionId === collectionId) {
    state.settings.defaultCollectionId = targetCollection.id;
  }

  if (filterCollectionId === collectionId) {
    filterCollectionId = targetCollection.id;
    state.settings.filterCollectionId = targetCollection.id;
  }

  await persistState({
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
    state
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
  showToast(translate('exportDone'), 'success');
}

async function importBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const json = JSON.parse(text);
    if (!window.confirm(translate('importReplaceConfirm'))) return;

    state = normalizeImportedPayload(json);
    currentLang = state.settings.lang;
    currentThemeIndex = getThemeIndex(state.settings.theme);
    filterCollectionId = state.settings.filterCollectionId;
    showFavoritesOnly = Boolean(state.settings.showFavoritesOnly);
    editingLinkId = null;
    searchQuery = '';
    elements.searchInput.value = '';
    clearUndoBar();
    closeForm();

    await persistState({
      syncBackup: true,
      toastKey: 'importDone'
    });
  } catch (error) {
    console.error('Import failed:', error);
    showToast(error.message || translate('importFailed'), 'error');
  } finally {
    event.target.value = '';
  }
}

function normalizeImportedPayload(payload) {
  if (Array.isArray(payload)) {
    return migrateLegacyState(payload, currentLang, state?.settings?.theme);
  }

  if (payload && typeof payload === 'object') {
    if (payload.state) return normalizeState(payload.state, currentLang, state?.settings?.theme);
    if (payload.collections || payload.links) return normalizeState(payload, currentLang, state?.settings?.theme);
  }

  throw new Error(translate('importInvalid'));
}

function openDevModal() {
  elements.devModal.classList.remove('hidden');
}

function closeDevModal() {
  elements.devModal.classList.add('hidden');
}

function openCollectionModal() {
  elements.collectionModal.classList.remove('hidden');
  renderCollectionManager();
  window.setTimeout(() => elements.newCollectionName.focus(), 0);
}

function closeCollectionModal() {
  elements.collectionModal.classList.add('hidden');
}

function closeUpdateModal() {
  elements.updateModal.classList.add('hidden');
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText('rusanov.code@gmail.com');
    showToast(translate('copied'), 'success');
  } catch (error) {
    console.error('Copy failed:', error);
    showToast(translate('copyFailed'), 'error');
  }
}

function renderVersion() {
  elements.versionDisplay.textContent = `v${chrome.runtime.getManifest().version}`;
}

async function checkForUpdates() {
  const button = elements.checkUpdateBtn;
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = translate('checkingUpdates');

  try {
    const currentVersion = chrome.runtime.getManifest().version;
    const [remoteManifest, remoteFingerprint, localFingerprint, remoteCommit] = await Promise.all([
      fetchRemoteManifest(),
      fetchRemoteFingerprint(),
      fetchLocalFingerprint(),
      fetchRemoteCommitInfo()
    ]);

    const remoteVersion = remoteManifest?.version || currentVersion;
    const versionDiff = compareVersions(remoteVersion, currentVersion);
    const codeChanged = Boolean(remoteFingerprint && localFingerprint && remoteFingerprint !== localFingerprint);

    if (versionDiff > 0 || codeChanged) {
      const lines = [
        `${translate('currentVersion')}: ${currentVersion}`,
        `${translate('remoteVersion')}: ${remoteVersion || translate('versionUnchanged')}`
      ];

      if (codeChanged && versionDiff <= 0) {
        lines.push(translate('updateAvailableSameVersion'));
      } else {
        lines.push(translate('updateAvailable', { version: remoteVersion }));
      }

      if (remoteCommit?.date) {
        lines.push(`${translate('remoteCommit')}: ${formatDate(remoteCommit.date)}`);
      }

      elements.updateModalText.textContent = lines.join('\n');
      elements.updateModal.classList.remove('hidden');
    } else {
      showToast(translate('latestVersion'), 'success');
    }
  } catch (error) {
    console.error('Update check failed:', error);
    showToast(translate('updateError'), 'error');
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

function compareVersions(left, right) {
  const leftParts = String(left).split('.').map((part) => Number(part || 0));
  const rightParts = String(right).split('.').map((part) => Number(part || 0));
  const length = Math.max(leftParts.length, rightParts.length);

  for (let index = 0; index < length; index += 1) {
    const leftValue = leftParts[index] || 0;
    const rightValue = rightParts[index] || 0;
    if (leftValue > rightValue) return 1;
    if (leftValue < rightValue) return -1;
  }

  return 0;
}

function openRepository() {
  chrome.tabs.create({ url: GITHUB_CONFIG.repoUrl });
}

function downloadRepositoryZip() {
  const downloadUrl = `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/archive/refs/heads/${GITHUB_CONFIG.branch}.zip`;
  chrome.tabs.create({ url: downloadUrl });
}

function applyTheme() {
  const theme = THEMES[currentThemeIndex];
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldUseDark = theme === 'dark' || (theme === 'system' && prefersDark);
  document.body.setAttribute('data-theme', shouldUseDark ? 'dark' : 'light');
}

async function toggleLanguage() {
  backupFeedback = { text: '', tone: 'neutral' };
  state.settings.lang = currentLang === 'ru' ? 'en' : 'ru';
  await persistState({ syncBackup: false });
}

async function cycleTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
  state.settings.theme = THEMES[currentThemeIndex];
  await persistState({ syncBackup: false });
}

function getThemeIndex(theme) {
  const index = THEMES.indexOf(normalizeTheme(theme));
  return index === -1 ? 1 : index;
}

function normalizeTheme(theme) {
  return THEMES.includes(theme) ? theme : 'system';
}

function inferLanguage(value) {
  if (value === 'ru' || value === 'en') return value;
  const browserLang = navigator.language?.toLowerCase() || '';
  return browserLang.startsWith('ru') ? 'ru' : 'en';
}

function translate(key, values = {}) {
  return textFor(currentLang, key, values);
}

function textFor(lang, key, values = {}) {
  const dictionary = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const fallback = TRANSLATIONS.en[key];
  const template = dictionary[key] || fallback || key;
  return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
}

function showToast(message, tone = 'neutral') {
  clearTimeout(toastTimer);
  elements.toast.className = 'toast';
  if (tone !== 'neutral') elements.toast.classList.add(tone);
  elements.toastText.textContent = message;
  elements.toast.classList.remove('hidden');
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, 3200);
}

function handleActionError(error) {
  console.error(error);
  showToast(error?.message || translate('saveFailed'), 'error');
}

function getPreferredCollectionId() {
  if (filterCollectionId !== ALL_COLLECTIONS_KEY && state.collections.some((collection) => collection.id === filterCollectionId)) {
    return filterCollectionId;
  }

  if (state.collections.some((collection) => collection.id === state.settings.defaultCollectionId)) {
    return state.settings.defaultCollectionId;
  }

  return state.collections[0]?.id;
}

function getCollectionById(collectionId) {
  return state.collections.find((collection) => collection.id === collectionId) || null;
}

function getCollectionName(collectionId) {
  return getCollectionById(collectionId)?.name || (currentLang === 'ru' ? 'Без коллекции' : 'No collection');
}

function getCollectionLinks(collectionId) {
  return state.links
    .filter((link) => link.collectionId === collectionId)
    .sort((a, b) => a.order - b.order);
}

function getLinkById(linkId) {
  return state.links.find((link) => link.id === linkId) || null;
}

function getIconSrc(link) {
  if (link.iconType === 'preset') {
    return PRESETS[link.iconData]?.data || PRESETS.link.data;
  }

  if (link.iconType === 'custom' && link.iconData) {
    return link.iconData;
  }

  if (/^(https?|chrome|edge):/i.test(link.url)) {
    return `${chrome.runtime.getURL('/_favicon/')}?pageUrl=${encodeURIComponent(link.url)}&size=32`;
  }

  return createFallbackIconData(link.name, link.url);
}

function createFallbackIconData(name, url) {
  const label = deriveIconLabel(name, url);
  const color = pickColorFromSeed(`${name}|${url}`);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="10" fill="${color}" />
      <text x="16" y="21" text-anchor="middle" font-size="14" font-family="Segoe UI, Arial, sans-serif" font-weight="700" fill="#ffffff">${label}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function deriveIconLabel(name, url) {
  const trimmedName = String(name || '').trim();
  if (trimmedName) return trimmedName[0].toUpperCase();

  try {
    const parsed = new URL(url);
    if (parsed.hostname) return parsed.hostname[0].toUpperCase();
  } catch (error) {
    return 'Q';
  }

  return 'Q';
}

function pickColorFromSeed(seed) {
  const palette = ['#14746f', '#355070', '#6d597a', '#bc6c25', '#4361ee', '#7a9e7e'];
  const index = Math.abs(hashString(seed)) % palette.length;
  return palette[index];
}

function hashString(value) {
  return Array.from(String(value)).reduce((hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0);
}

function parseAndNormalizeUrl(rawUrl) {
  let candidate = String(rawUrl || '').trim();
  if (!candidate) throw new Error(translate('invalidUrl'));

  if (!/^[a-z][a-z\d+\-.]*:/i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  let parsed;
  try {
    parsed = new URL(candidate);
  } catch (error) {
    throw new Error(translate('invalidUrl'));
  }

  const allowedProtocols = new Set(['http:', 'https:', 'chrome:', 'edge:', 'mailto:', 'tel:']);
  if (!allowedProtocols.has(parsed.protocol)) {
    throw new Error(translate('unsupportedProtocol'));
  }

  if ((parsed.protocol === 'http:' || parsed.protocol === 'https:') && !parsed.hostname) {
    throw new Error(translate('invalidUrl'));
  }

  const cleaned = new URL(parsed.toString());
  if (cleaned.hostname) cleaned.hostname = cleaned.hostname.toLowerCase();
  if ((cleaned.protocol === 'http:' && cleaned.port === '80') || (cleaned.protocol === 'https:' && cleaned.port === '443')) {
    cleaned.port = '';
  }

  const duplicateKey = new URL(cleaned.toString());
  if (duplicateKey.protocol === 'http:' || duplicateKey.protocol === 'https:') {
    duplicateKey.hash = '';
    if (duplicateKey.pathname !== '/' && duplicateKey.pathname.endsWith('/')) {
      duplicateKey.pathname = duplicateKey.pathname.replace(/\/+$/, '');
    }
  }

  return {
    url: cleaned.toString(),
    normalized: duplicateKey.toString()
  };
}

function formatUrlForDisplay(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'mailto:') return `mailto:${parsed.pathname}`;
    if (parsed.protocol === 'tel:') return `tel:${parsed.pathname}`;
    if (parsed.protocol === 'chrome:' || parsed.protocol === 'edge:') {
      return `${parsed.protocol}//${parsed.hostname}${parsed.pathname}`;
    }

    const path = parsed.pathname === '/' ? '' : parsed.pathname;
    return `${parsed.host}${path}`;
  } catch (error) {
    return url;
  }
}

function deriveNameFromUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname || url;
  } catch (error) {
    return url;
  }
}

function formatDate(isoString) {
  try {
    return new Intl.DateTimeFormat(currentLang === 'ru' ? 'ru-RU' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(isoString));
  } catch (error) {
    return isoString;
  }
}

function createId(prefix) {
  const randomPart = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${randomPart}`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('File read failed'));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

function openLink(url) {
  chrome.tabs.create({ url });
}

async function getActiveTab() {
  const tabs = await tabsQuery({
    active: true,
    currentWindow: true
  });
  return tabs[0] || null;
}

function storageGet(keys) {
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

function storageSet(items) {
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

function tabsQuery(queryInfo) {
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

function bookmarksGetTree() {
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

function bookmarksGetChildren(id) {
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

function bookmarksCreate(details) {
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

function bookmarksRemoveTree(id) {
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

function bookmarksRemove(id) {
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

async function getBackupRootNode() {
  const tree = await bookmarksGetTree();
  return findBookmarkNode(tree[0], (node) => !node.url && node.title === BACKUP_ROOT_TITLE);
}

async function createBackupRootNode() {
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

async function clearBookmarkChildren(parentId) {
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
