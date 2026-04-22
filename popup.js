export const STORAGE_KEY = 'quickLinksState';
export const LEGACY_STORAGE_KEY = 'quickLinks';
export const SCHEMA_VERSION = 2;
export const ALL_COLLECTIONS_KEY = '__all__';
export const BACKUP_ROOT_TITLE = 'Quick Links Menu Backup';
export const MAX_CUSTOM_ICON_BYTES = 256 * 1024;
export const SOURCE_FILES = [
  'manifest.json',
  'popup.html',
  'popup.js',
  'popup-platform.js',
  'popup-helpers.js',
  'popup-state.js',
  'popup-render.js',
  'popup-actions.js',
  'popup-update.js'
];

export const PRESETS = {
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

export const THEMES = ['light', 'system', 'dark'];
export const THEME_LABELS = ['L', 'S', 'D'];
export const MIN_UI_SCALE = 0.8;
export const MAX_UI_SCALE = 1.2;
export const UI_SCALE_STEP = 0.1;

export const GITHUB_CONFIG = {
  owner: 'rusanovcode',
  repo: 'QuickLinks',
  branch: 'main',
  manifestPath: 'manifest.json',
  repoUrl: 'https://github.com/rusanovcode/QuickLinks'
};

export const TRANSLATIONS = {
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
    exportJson: 'Экспорт',
    importJson: 'Импорт',
    exportInfoLabel: 'О JSON-экспорте',
    exportInfoNotice: 'Экспорт происходит в JSON и сохраняет заметки, кастомные иконки, избранное и коллекции в одном файле.',
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
    checkUpdates: '\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C',
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
    exportJson: 'Export',
    importJson: 'Import',
    exportInfoLabel: 'About JSON export',
    exportInfoNotice: 'Export uses JSON and keeps notes, custom icons, favorites, and collections in one file.',
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
    checkUpdates: 'Update',
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


let ctx = null;
let deps = null;

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  alert(error?.message || 'Quick Links failed to initialize.');
});

async function bootstrap() {
  const [
    helpers,
    platform,
    { createStateManager },
    { createRenderer },
    { createActions },
    { createUpdateService }
  ] = await Promise.all([
    import('./popup-helpers.js'),
    import('./popup-platform.js'),
    import('./popup-state.js'),
    import('./popup-render.js'),
    import('./popup-actions.js'),
    import('./popup-update.js')
  ]);

  ctx = createAppContext();
  deps = {
    textFor: helpers.textFor,
    getThemeIndex: helpers.getThemeIndex,
    normalizeTheme: helpers.normalizeTheme,
    normalizeUiScale: helpers.normalizeUiScale,
    inferLanguage: helpers.inferLanguage,
    compareVersions: helpers.compareVersions,
    createId: helpers.createId,
    readFileAsDataUrl: helpers.readFileAsDataUrl,
    getActiveTab: platform.getActiveTab,
    openLink: platform.openBrowserTab,
    getIconSrc: helpers.getIconSrc,
    createFallbackIconData: helpers.createFallbackIconData,
    formatUrlForDisplay: helpers.formatUrlForDisplay,
    deriveNameFromUrl: helpers.deriveNameFromUrl,
    translate(key, values = {}) {
      return helpers.textFor(ctx.currentLang, key, values);
    },
    parseAndNormalizeUrl(rawUrl) {
      return helpers.parseAndNormalizeUrl(rawUrl, deps.translate);
    },
    formatDate(isoString) {
      return helpers.formatDate(isoString, ctx.currentLang);
    }
  };

  Object.assign(deps, createRenderer(ctx, deps));
  Object.assign(deps, createStateManager(ctx, deps));
  Object.assign(deps, createUpdateService(ctx, deps));
  Object.assign(deps, createActions(ctx, deps));

  startApp();
}

function startApp() {
  const run = () => {
    initApp().catch((error) => {
      console.error('Init failed:', error);
      alert(error?.message || 'Quick Links failed to initialize.');
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
    return;
  }

  run();
}

async function initApp() {
  deps.cacheElements();
  deps.bindEventListeners();

  ctx.state = await deps.loadAppState();
  ctx.currentLang = ctx.state.settings.lang;
  ctx.currentThemeIndex = deps.getThemeIndex(ctx.state.settings.theme);
  ctx.filterCollectionId = ctx.state.settings.filterCollectionId;
  ctx.showFavoritesOnly = Boolean(ctx.state.settings.showFavoritesOnly);
  ctx.uiScale = deps.normalizeUiScale(ctx.state.settings.uiScale);

  deps.applyTheme();
  deps.applyUiScale();
  deps.renderVersion();
  await deps.syncBackupWithStatus(false);
  deps.renderAll();

  if (ctx.bootNotice) {
    deps.showToast(ctx.bootNotice, 'success');
    ctx.bootNotice = '';
  }

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  if (media && media.addEventListener) {
    media.addEventListener('change', () => {
      if (ctx.state?.settings.theme === 'system') deps.applyTheme();
    });
  }
}

function createAppContext() {
  return {
    state: null,
    currentLang: 'en',
    currentThemeIndex: 1,
    uiScale: 1,
    selectedMode: 'auto',
    selectedPreset: null,
    customIconData: null,
    editingLinkId: null,
    filterCollectionId: ALL_COLLECTIONS_KEY,
    showFavoritesOnly: false,
    searchQuery: '',
    dragLinkId: null,
    lastDeletedLink: null,
    bootNotice: '',
    isBackupExpanded: false,
    backupFeedback: { text: '', tone: 'neutral' },
    exportInfoTimer: null,
    layoutFrame: null,
    toastTimer: null,
    undoTimer: null,
    elements: {}
  };
}


