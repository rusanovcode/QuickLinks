const PRESETS = {
  star: { data: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23FFB800' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E" },
  robot: { data: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%2340C057' viewBox='0 0 24 24'%3E%3Cpath d='M9 3a3 3 0 00-3 3v9h2v5l6-2 6 2v-5h2V6a3 3 0 00-3-3H9zm0 2h6a1 1 0 011 1v6h-1v5l-4-1.5-4 1.5V7H8V6a1 1 0 011-1z'/%3E%3C/svg%3E" },
  cloud: { data: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%234A90E2' viewBox='0 0 24 24'%3E%3Cpath d='M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 16H5v-2h14v2zm0-4H5v-2h14v2zm0-4H5V5h14v6z'/%3E%3C/svg%3E" },
  link: { data: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23FA5252' viewBox='0 0 24 24'%3E%3Cpath d='M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2zm1 1v18h18V4H4zm11 3l-6 6h4v6h-4v-6H8l6-6z'/%3E%3C/svg%3E" }
};

const THEME_LABELS = ['W', 'S', 'D'];
const THEMES = ['light', 'system', 'dark'];

const GITHUB_CONFIG = {
  owner: 'rusanovcode',
  repo: 'Quick-Links',
  branch: 'main',
  manifestPath: 'manifest.json',
  repoUrl: 'https://github.com/rusanovcode/Quick-Links'
};

const TRANSLATIONS = {
  ru: {
    appTitle: '🔗 Быстрые ссылки',
    addNew: 'Новая ссылка',
    edit: 'Редактирование',
    namePlaceholder: 'Название',
    urlPlaceholder: 'URL (https://...)',
    descPlaceholder: 'Описание (необязательно)',
    iconLabel: 'Иконка:',
    autoIcon: 'Авто (favicon)',
    presetsLabel: 'Пресеты:',
    uploadPng: 'Загрузить PNG',
    selected: 'Выбрано',
    auto: 'Авто',
    choose: 'Выберите',
    custom: 'Своя',
    add: 'Добавить',
    save: 'Сохранить',
    cancel: 'Отмена',
    deleted: 'Удалено',
    undo: 'Отменить',
    noLinks: 'Нет ссылок<br>Нажмите +',
    devTitle: '👋 Привет!',
    devText: 'Есть идеи по улучшению? Нашли баг?<br>Пишите — буду рад feedback\'у!',
    close: 'Закрыть',
    devLink: 'Русанов',
    lang: 'RU',
    usefulBtn: 'Полезно',
    usefulTitle: '📋 Как создать N копий расширения',
    usefulClose: 'Закрыть',
    themeLight: 'Light',
    themeSystem: 'System',
    themeDark: 'Dark',
    themeTooltip: 'Click to switch theme',
    copied: 'Скопировано!',
    copyError: 'Ошибка копирования',
    checkUpdate: 'Проверить обновления',
    updateAvailable: 'Доступна версия',
    noUpdate: 'У вас последняя версия',
    updateError: 'Ошибка проверки',
    download: 'Скачать',
    github: 'GitHub',
    currentVersion: 'Текущая',
    updateInstructionsTitle: 'Как обновить:',
    updateInstructions: `<strong>1.</strong> Нажмите <strong>«Скачать»</strong> — загрузится архив с новой версией<br><br>
<strong>2.</strong> Распакуйте архив в любую папку<br><br>
<strong>3.</strong> Откройте <code>chrome://extensions/</code> в новой вкладке<br><br>
<strong>4.</strong> Включите переключатель <strong>«Режим разработчика»</strong> (справа вверху)<br><br>
<strong>5.</strong> Нажмите кнопку <strong>«Загрузить распакованное»</strong><br><br>
<strong>6.</strong> Выберите папку с распакованной новой версией<br><br>
<strong>Готово!</strong> Расширение обновится, а ваши ссылки сохранятся.<br><br>
<em>Или просто замените файлы в текущей папке расширения на новые.</em>`,
    understood: 'Понятно',
    usefulText: `Чтобы иметь <strong>N иконок</strong> в тулбаре с разными списками ссылок:<br><br>

<strong>1. Создайте N папок</strong> с любыми именами:<br>
<code>work-links</code>, <code>personal-links</code>...<br><br>

<strong>2. В каждой папке</strong> файлы <code>manifest.json</code>, <code>popup.html</code>, <code>popup.js</code>, но в <code>manifest.json</code> измените:<br><br>

<strong>Для копии 2:</strong>
<pre>{
  "manifest_version": 3,
  "name": "Quick Links 2",
  "action": { "default_title": "Quick Links 2" }
}</pre>

<strong>3. Загрузка:</strong><br>
<code>chrome://extensions/</code> → <strong>Режим разработчика</strong> → <strong>Загрузить распакованное</strong> → выберите каждую папку.<br><br>

<strong>⚠️ Важно:</strong> Каждая копия имеет <strong>независимое хранилище</strong>. Если упаковать в .crx — данные будут общими.`
  },
  en: {
    appTitle: '🔗 Quick Links',
    addNew: 'New Link',
    edit: 'Edit Link',
    namePlaceholder: 'Name',
    urlPlaceholder: 'URL (https://...)',
    descPlaceholder: 'Description (optional)',
    iconLabel: 'Icon:',
    autoIcon: 'Auto (favicon)',
    presetsLabel: 'Presets:',
    uploadPng: 'Upload PNG',
    selected: 'Selected',
    auto: 'Auto',
    choose: 'Choose',
    custom: 'Custom',
    add: 'Add',
    save: 'Save',
    cancel: 'Cancel',
    deleted: 'Deleted',
    undo: 'Undo',
    noLinks: 'No links<br>Click +',
    devTitle: '👋 Hi there!',
    devText: 'Have ideas for improvement? Found a bug?<br>Drop a line — I\'d love your feedback!',
    close: 'Close',
    devLink: 'Rusanov',
    lang: 'EN',
    usefulBtn: 'Useful',
    usefulTitle: '📋 How to create N extension copies',
    usefulClose: 'Close',
    themeLight: 'Light',
    themeSystem: 'System',
    themeDark: 'Dark',
    themeTooltip: 'Click to switch theme',
    copied: 'Copied!',
    copyError: 'Copy failed',
    checkUpdate: 'Check for updates',
    updateAvailable: 'Version available',
    noUpdate: 'You have the latest version',
    updateError: 'Check failed',
    download: 'Download',
    github: 'GitHub',
    currentVersion: 'Current',
    updateInstructionsTitle: 'How to update:',
    updateInstructions: `<strong>1.</strong> Click <strong>«Download»</strong> — archive with new version will download<br><br>
<strong>2.</strong> Extract the archive to any folder<br><br>
<strong>3.</strong> Open <code>chrome://extensions/</code> in a new tab<br><br>
<strong>4.</strong> Enable <strong>«Developer mode»</strong> toggle (top right)<br><br>
<strong>5.</strong> Click <strong>«Load unpacked»</strong> button<br><br>
<strong>6.</strong> Select the folder with extracted new version<br><br>
<strong>Done!</strong> Extension will update, your links stay saved.<br><br>
<em>Or simply replace files in your current extension folder with new ones.</em>`,
    understood: 'Got it',
    usefulText: `To have <strong>N icons</strong> in the toolbar with different link lists:<br><br>

<strong>1. Create N folders</strong> with any names:<br>
<code>work-links</code>, <code>personal-links</code>...<br><br>

<strong>2. In each folder</strong> files <code>manifest.json</code>, <code>popup.html</code>, <code>popup.js</code>, but change in <code>manifest.json</code>:<br><br>

<strong>For copy 2:</strong>
<pre>{
  "manifest_version": 3,
  "name": "Quick Links 2",
  "action": { "default_title": "Quick Links 2" }
}</pre>

<strong>3. Loading:</strong><br>
<code>chrome://extensions/</code> → <strong>Developer mode</strong> → <strong>Load unpacked</strong> → select each folder.<br><br>

<strong>⚠️ Important:</strong> Each copy has <strong>independent storage</strong>. If packed to .crx — data will be shared.`
  }
};

let selectedMode = 'auto', selectedPreset = null, customIconData = null;
let lastDeleted = null, editingIndex = null, dragSrcIndex = null;
let currentLang = 'en';
let currentThemeIndex = 1;
let isDragging = false;
let updateAvailable = false;
let newVersionAvailable = null;

document.addEventListener('DOMContentLoaded', () => {
  initSettings();
});

function initSettings() {
  chrome.storage.local.get(['theme', 'lang'], (res) => {
    currentLang = res.lang || 'en';
    currentThemeIndex = THEMES.indexOf(res.theme) !== -1 ? THEMES.indexOf(res.theme) : 1;

    updateThemeUI(currentThemeIndex);
    updateLanguage();
    setupEventListeners();
    setupIconSelector();
    loadLinks();
    displayVersion();
  });

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      chrome.storage.local.get(['theme'], (res) => {
        if (!res.theme || res.theme === 'system') applySystemTheme();
      });
    });
  }
}

function displayVersion() {
  const manifest = chrome.runtime.getManifest();
  const version = manifest.version;
  document.getElementById('versionDisplay').textContent = 'v' + version;
}

function applySystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
  }
}

function updateThemeUI(index) {
  const thumb = document.getElementById('themeThumb');
  const letter = document.getElementById('thumbLetter');
  const sliderContainer = document.getElementById('themeSliderContainer');
  const t = TRANSLATIONS[currentLang];

  const positions = ['4px', '22px', '40px'];
  thumb.style.left = positions[index];
  letter.textContent = THEME_LABELS[index];

  const themeNames = [t.themeLight, t.themeSystem, t.themeDark];
  sliderContainer.title = themeNames[index] + ' — ' + t.themeTooltip;

  const theme = THEMES[index];
  if (theme === 'system') {
    applySystemTheme();
  } else if (theme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
  }

  chrome.storage.local.set({ theme: theme });
}

function updateLanguage() {
  const t = TRANSLATIONS[currentLang];

  document.getElementById('langBtn').textContent = t.lang;
  document.getElementById('appTitle').textContent = t.appTitle;
  document.getElementById('formTitle').textContent = editingIndex !== null ? t.edit : t.addNew;
  document.getElementById('siteName').placeholder = t.namePlaceholder;
  document.getElementById('siteUrl').placeholder = t.urlPlaceholder;
  document.getElementById('siteDesc').placeholder = t.descPlaceholder;
  document.getElementById('iconLabel').textContent = t.iconLabel;
  document.getElementById('optAutoText').textContent = t.autoIcon;
  document.getElementById('presetsLabel').textContent = t.presetsLabel;
  document.getElementById('uploadBtnText').innerHTML = t.uploadPng + '<input type="file" id="pngInput" accept="image/png">';
  document.getElementById('saveBtn').textContent = editingIndex !== null ? t.save : t.add;
  document.getElementById('cancelBtn').textContent = t.cancel;
  document.getElementById('undoText').textContent = t.deleted;
  document.getElementById('undoBtn').textContent = t.undo;
  document.getElementById('devTitle').textContent = t.devTitle;
  document.getElementById('devText').innerHTML = t.devText;
  document.getElementById('closeModalBtn').textContent = t.close;
  document.getElementById('devLink').textContent = t.devLink;

  document.getElementById('usefulBtn').textContent = t.usefulBtn;
  document.getElementById('usefulTitle').textContent = t.usefulTitle;
  document.getElementById('usefulText').innerHTML = t.usefulText;
  document.getElementById('closeUsefulBtn').textContent = t.usefulClose;

  document.getElementById('updateInstructionsTitle').textContent = t.updateInstructionsTitle;
  document.getElementById('updateInstructionsText').innerHTML = t.updateInstructions;
  document.getElementById('understoodBtn').textContent = t.understood;

  // Обновление текста кнопки проверки обновлений
  if (!updateAvailable) {
    document.getElementById('checkUpdateText').textContent = t.checkUpdate;
  }

  document.getElementById('pngInput').onchange = handleFileUpload;
  updateSelectedInfo();
}

function updateSelectedInfo() {
  const t = TRANSLATIONS[currentLang];
  let text = t.selected + ': ';
  if (selectedMode === 'auto') text += t.auto;
  else if (selectedMode === 'preset') text += selectedPreset ? t.custom : t.choose;
  else text += customIconData ? t.custom + ' ✓' : t.choose;
  document.getElementById('selectedInfo').textContent = text;

  const emptyDiv = document.querySelector('.empty');
  if (emptyDiv) emptyDiv.innerHTML = t.noLinks;
}

function toggleLanguage() {
  currentLang = currentLang === 'ru' ? 'en' : 'ru';
  chrome.storage.local.set({ lang: currentLang });
  updateLanguage();
  loadLinks();
}

function setupIconSelector() {
  document.getElementById('optAuto').onclick = () => selectMode('auto');
  document.getElementById('optPreset').onclick = (e) => { 
    if (!e.target.closest('.preset-btn')) selectMode('preset'); 
  };
  document.getElementById('optCustom').onclick = () => selectMode('custom');

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.onclick = (e) => { 
      e.stopPropagation(); 
      selectPreset(btn.dataset.key); 
    };
  });

  document.getElementById('pngInput').onchange = handleFileUpload;
}

function selectMode(mode) {
  selectedMode = mode;
  document.querySelectorAll('.icon-option').forEach(el => el.classList.remove('active'));
  document.getElementById('opt' + mode.charAt(0).toUpperCase() + mode.slice(1)).classList.add('active');
  updateSelectedInfo();
}

function selectPreset(key) {
  selectedPreset = key; 
  selectedMode = 'preset';
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-key="${key}"]`).classList.add('active');
  document.getElementById('optPreset').classList.add('active');
  ['optAuto', 'optCustom'].forEach(id => document.getElementById(id).classList.remove('active'));
  updateSelectedInfo();
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file || file.type !== 'image/png') { 
    alert(currentLang === 'ru' ? 'Только PNG!' : 'PNG only!'); 
    return; 
  }
  if (file.size > 100 * 1024) { 
    alert(currentLang === 'ru' ? 'Максимум 100KB' : 'Max 100KB'); 
    return; 
  }

  const reader = new FileReader();
  reader.onload = (ev) => { 
    customIconData = ev.target.result; 
    selectMode('custom'); 
  };
  reader.readAsDataURL(file);
}

function getIconSrc(link) {
  if (link.iconType === 'favicon') {
    try {
      const domain = new URL(link.url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch(e) { 
      return PRESETS.link.data; 
    }
  } else if (link.iconType === 'preset') {
    return PRESETS[link.iconData]?.data || PRESETS.link.data;
  }
  return link.iconData || PRESETS.link.data;
}

function loadLinks() {
  chrome.storage.local.get(['quickLinks'], (res) => renderLinks(res.quickLinks || []));
}

function renderLinks(links) {
  const container = document.getElementById('linksList');
  const tooltip = document.getElementById('globalTooltip');
  const t = TRANSLATIONS[currentLang];

  if (links.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty';
    emptyDiv.innerHTML = t.noLinks;
    emptyDiv.onclick = () => {
      document.getElementById('showAddBtn').click();
    };
    container.innerHTML = '';
    container.appendChild(emptyDiv);
    return;
  }

  container.innerHTML = '';
  links.forEach((link, index) => {
    const div = document.createElement('div');
    div.className = 'link-item';
    div.dataset.index = index;

    const dragHandle = document.createElement('div');
    dragHandle.className = 'drag-handle';
    dragHandle.innerHTML = `
      <div class="drag-dots"><div class="drag-dot"></div><div class="drag-dot"></div></div>
      <div class="drag-dots"><div class="drag-dot"></div><div class="drag-dot"></div></div>
      <div class="drag-dots"><div class="drag-dot"></div><div class="drag-dot"></div></div>
    `;
    dragHandle.draggable = true;

    dragHandle.addEventListener('dragstart', (e) => {
      isDragging = true;
      dragSrcIndex = index;
      div.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      document.querySelectorAll('.link-actions').forEach(el => el.style.display = 'none');
    });

    dragHandle.addEventListener('dragend', () => {
      isDragging = false;
      div.classList.remove('dragging');
      dragSrcIndex = null;
      document.querySelectorAll('.link-actions').forEach(el => el.style.display = '');
      document.querySelectorAll('.link-item').forEach(item => item.classList.remove('drag-over'));
    });

    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('drop', (e) => handleDrop(e, index));
    div.addEventListener('dragenter', () => { 
      if (isDragging && dragSrcIndex !== index) div.classList.add('drag-over'); 
    });
    div.addEventListener('dragleave', () => div.classList.remove('drag-over'));

    if (link.description && link.description.trim()) {
      div.onmouseenter = () => {
        tooltip.textContent = link.description;
        tooltip.style.display = 'block';
        const rect = div.getBoundingClientRect();
        tooltip.style.left = (rect.left + 10) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
      };
      div.onmouseleave = () => tooltip.style.display = 'none';
    }

    const content = document.createElement('div');
    content.className = 'link-content';
    content.innerHTML = `<div class="link-name">${escapeHtml(link.name)}</div>`;
    content.onclick = () => chrome.tabs.create({ url: link.url });

    const actions = document.createElement('div');
    actions.className = 'link-actions';
    actions.innerHTML = `
      <button class="btn-edit">✎</button>
      <button class="btn-delete">×</button>
    `;
    actions.querySelector('.btn-edit').onclick = (e) => { 
      e.stopPropagation(); 
      startEdit(index); 
    };
    actions.querySelector('.btn-delete').onclick = (e) => { 
      e.stopPropagation(); 
      deleteLink(index); 
    };

    div.innerHTML = '';
    div.appendChild(content);
    div.appendChild(actions);
    div.appendChild(dragHandle);

    const icon = document.createElement('img');
    icon.src = getIconSrc(link);
    icon.className = 'link-icon';
    icon.onerror = () => icon.src = PRESETS.link.data;
    div.insertBefore(icon, content);

    container.appendChild(div);
  });
}

function handleDragOver(e) {
  if (e.preventDefault) e.preventDefault();
  return false;
}

function handleDrop(e, targetIndex) {
  if (e.stopPropagation) e.stopPropagation();
  if (dragSrcIndex === null || dragSrcIndex === targetIndex) return false;

  chrome.storage.local.get(['quickLinks'], (res) => {
    const links = res.quickLinks || [];
    const [moved] = links.splice(dragSrcIndex, 1);
    links.splice(targetIndex, 0, moved);
    chrome.storage.local.set({ quickLinks: links }, () => renderLinks(links));
  });
  return false;
}

function startEdit(index) {
  chrome.storage.local.get(['quickLinks'], (res) => {
    const link = res.quickLinks[index];
    editingIndex = index;

    document.getElementById('siteName').value = link.name;
    document.getElementById('siteUrl').value = link.url;
    document.getElementById('siteDesc').value = link.description || '';

    if (link.iconType === 'favicon') selectMode('auto');
    else if (link.iconType === 'preset') selectPreset(link.iconData);
    else { 
      customIconData = link.iconData; 
      selectMode('custom'); 
    }

    document.getElementById('addForm').style.display = 'block';
    document.getElementById('showAddBtn').style.display = 'none';
    updateLanguage();
  });
}

function saveLink() {
  const t = TRANSLATIONS[currentLang];
  const name = document.getElementById('siteName').value.trim();
  let url = document.getElementById('siteUrl').value.trim();
  const description = document.getElementById('siteDesc').value.trim();

  if (!name || !url) { 
    alert(currentLang === 'ru' ? 'Заполните поля' : 'Fill in all fields'); 
    return; 
  }
  if (!/^https?:\/\//.test(url)) url = 'https://' + url;

  let iconType, iconData;
  if (selectedMode === 'auto') { 
    iconType = 'favicon'; 
    iconData = null; 
  } else if (selectedMode === 'preset') {
    if (!selectedPreset) { 
      alert(currentLang === 'ru' ? 'Выберите иконку' : 'Select icon'); 
      return; 
    }
    iconType = 'preset'; 
    iconData = selectedPreset;
  } else {
    if (!customIconData) { 
      alert(currentLang === 'ru' ? 'Загрузите PNG' : 'Upload PNG'); 
      return; 
    }
    iconType = 'custom'; 
    iconData = customIconData;
  }

  const linkData = { name, url, description, iconType, iconData };

  chrome.storage.local.get(['quickLinks'], (res) => {
    const links = res.quickLinks || [];
    if (editingIndex !== null) {
      links[editingIndex] = linkData;
    } else {
      links.push(linkData);
    }

    chrome.storage.local.set({ quickLinks: links }, () => {
      renderLinks(links);
      closeForm();
    });
  });
}

function deleteLink(index) {
  chrome.storage.local.get(['quickLinks'], (res) => {
    const links = res.quickLinks || [];
    lastDeleted = { link: links[index], index };
    links.splice(index, 1);
    chrome.storage.local.set({ quickLinks: links }, () => {
      renderLinks(links);
      document.getElementById('undoBlock').style.display = 'flex';
    });
  });
}

function closeForm() {
  document.getElementById('addForm').style.display = 'none';
  document.getElementById('showAddBtn').style.display = 'flex';
  editingIndex = null;
  resetForm();
}

function resetForm() {
  document.getElementById('siteName').value = '';
  document.getElementById('siteUrl').value = '';
  document.getElementById('siteDesc').value = '';
  selectedMode = 'auto'; 
  selectedPreset = null; 
  customIconData = null;
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  selectMode('auto');
  updateLanguage();
}

// Проверка обновлений
async function checkForUpdates() {
  const btn = document.getElementById('checkUpdateBtn');
  const t = TRANSLATIONS[currentLang];
  
  btn.classList.add('spinning');
  btn.disabled = true;
  
  try {
    const url = `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.manifestPath}?t=${Date.now()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const remoteManifest = await response.json();
    const currentVersion = chrome.runtime.getManifest().version;
    const remoteVersion = remoteManifest.version;
    
    if (remoteVersion > currentVersion) {
      updateAvailable = true;
      newVersionAvailable = remoteVersion;
      showUpdateAvailableUI(remoteVersion, currentVersion);
    } else {
      updateAvailable = false;
      btn.classList.remove('spinning');
      btn.disabled = false;
      btn.innerHTML = `<span class="update-icon">✓</span><span>${t.noUpdate}</span>`;
      setTimeout(() => {
        resetUpdateButton();
      }, 2000);
    }
    
  } catch (err) {
    console.error('Update check failed:', err);
    btn.classList.remove('spinning');
    btn.disabled = false;
    btn.innerHTML = `<span class="update-icon">✗</span><span>${t.updateError}</span>`;
    setTimeout(() => {
      resetUpdateButton();
    }, 2000);
  }
}

function showUpdateAvailableUI(newVersion, currentVersion) {
  const t = TRANSLATIONS[currentLang];
  const btn = document.getElementById('checkUpdateBtn');
  
  const footer = document.querySelector('.dev-modal-footer');
  footer.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <span class="update-available-info">${t.updateAvailable}: ${newVersion}</span>
      <div class="update-buttons-small">
        <button class="btn-download-small" id="downloadBtn">${t.download}</button>
        <button class="btn-github-small" id="githubBtnDev">${t.github}</button>
      </div>
    </div>
    <button class="btn-close-modal" id="closeModalBtn">${t.close}</button>
  `;
  
  document.getElementById('downloadBtn').onclick = () => {
    const downloadUrl = `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/archive/refs/heads/${GITHUB_CONFIG.branch}.zip`;
    chrome.tabs.create({ url: downloadUrl });
    
    document.getElementById('updateModal').style.display = 'flex';
  };
  
  document.getElementById('githubBtnDev').onclick = () => {
    chrome.tabs.create({ url: GITHUB_CONFIG.repoUrl });
  };
  
  document.getElementById('closeModalBtn').onclick = () => {
    document.getElementById('devModal').style.display = 'none';
  };
}

function resetUpdateButton() {
  const t = TRANSLATIONS[currentLang];
  const footer = document.querySelector('.dev-modal-footer');
  
  footer.innerHTML = `
    <button class="btn-check-update" id="checkUpdateBtn">
      <span class="update-icon">↻</span>
      <span>${t.checkUpdate}</span>
    </button>
    <button class="btn-close-modal" id="closeModalBtn">${t.close}</button>
  `;
  
  document.getElementById('checkUpdateBtn').onclick = checkForUpdates;
  document.getElementById('closeModalBtn').onclick = () => {
    document.getElementById('devModal').style.display = 'none';
  };
}

function setupEventListeners() {
  document.getElementById('langBtn').onclick = toggleLanguage;

  document.getElementById('themeSliderContainer').onclick = () => {
    currentThemeIndex = (currentThemeIndex + 1) % 3;
    updateThemeUI(currentThemeIndex);
  };

  document.getElementById('showAddBtn').onclick = () => {
    editingIndex = null; 
    resetForm();
    document.getElementById('addForm').style.display = 'block';
    document.getElementById('showAddBtn').style.display = 'none';
    updateLanguage();
  };

  document.getElementById('cancelBtn').onclick = closeForm;
  document.getElementById('saveBtn').onclick = saveLink;

  document.getElementById('siteUrl').onkeypress = (e) => { 
    if (e.key === 'Enter') saveLink(); 
  };

  document.getElementById('undoBtn').onclick = () => {
    if (!lastDeleted) return;
    chrome.storage.local.get(['quickLinks'], (res) => {
      const links = res.quickLinks || [];
      links.splice(lastDeleted.index, 0, lastDeleted.link);
      chrome.storage.local.set({ quickLinks: links }, () => {
        renderLinks(links);
        document.getElementById('undoBlock').style.display = 'none';
        lastDeleted = null;
      });
    });
  };

  document.getElementById('devLink').onclick = () => {
    document.getElementById('devModal').style.display = 'flex';
    if (updateAvailable) {
      resetUpdateButton();
      updateAvailable = false;
    }
  };

  document.getElementById('devModal').onclick = (e) => {
    if (e.target.id === 'devModal') {
      document.getElementById('devModal').style.display = 'none';
    }
  };

  document.getElementById('closeModalBtn').onclick = () => {
    document.getElementById('devModal').style.display = 'none';
  };

  document.getElementById('usefulBtn').onclick = () => {
    document.getElementById('usefulModal').style.display = 'flex';
  };

  document.getElementById('usefulModal').onclick = (e) => {
    if (e.target.id === 'usefulModal') {
      document.getElementById('usefulModal').style.display = 'none';
    }
  };

  document.getElementById('closeUsefulBtn').onclick = () => {
    document.getElementById('usefulModal').style.display = 'none';
  };

  document.getElementById('copyEmailBtn').onclick = async () => {
    const t = TRANSLATIONS[currentLang];
    const btn = document.getElementById('copyEmailBtn');
    
    try {
      await navigator.clipboard.writeText('rusanov.code@gmail.com');
      btn.textContent = '✓';
      btn.classList.add('copied');
      
      const originalTitle = btn.title;
      btn.title = t.copied;
      
      setTimeout(() => {
        btn.textContent = '📋';
        btn.classList.remove('copied');
        btn.title = originalTitle;
      }, 1500);
    } catch (err) {
      console.error('Copy failed:', err);
      btn.title = t.copyError;
      setTimeout(() => {
        btn.title = 'Copy email';
      }, 2000);
    }
  };

  document.getElementById('checkUpdateBtn').onclick = checkForUpdates;

  document.getElementById('understoodBtn').onclick = () => {
    document.getElementById('updateModal').style.display = 'none';
  };

  document.getElementById('updateModal').onclick = (e) => {
    if (e.target.id === 'updateModal') {
      document.getElementById('updateModal').style.display = 'none';
    }
  };

  // GitHub link в футере
  document.getElementById('githubFooterLink').onclick = () => {
    chrome.tabs.create({ url: GITHUB_CONFIG.repoUrl });
  };
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}