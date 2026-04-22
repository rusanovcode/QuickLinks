import { MAX_UI_SCALE, MIN_UI_SCALE, PRESETS, THEMES, TRANSLATIONS } from './popup.js';

export function getThemeIndex(theme) {
  const index = THEMES.indexOf(normalizeTheme(theme));
  return index === -1 ? 1 : index;
}

export function normalizeTheme(theme) {
  return THEMES.includes(theme) ? theme : 'system';
}

export function normalizeUiScale(scale) {
  const numeric = Number(scale);
  if (!Number.isFinite(numeric)) return 1;
  const rounded = Math.round(numeric * 10) / 10;
  return Math.min(MAX_UI_SCALE, Math.max(MIN_UI_SCALE, rounded));
}

export function inferLanguage(value) {
  if (value === 'ru' || value === 'en') return value;
  const browserLang = navigator.language?.toLowerCase() || '';
  return browserLang.startsWith('ru') ? 'ru' : 'en';
}

export function textFor(lang, key, values = {}) {
  const dictionary = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const fallback = TRANSLATIONS.en[key];
  const template = dictionary[key] || fallback || key;
  return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
}

export function compareVersions(left, right) {
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

export function getIconSrc(link) {
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

export function createFallbackIconData(name, url) {
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

export function deriveIconLabel(name, url) {
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

export function pickColorFromSeed(seed) {
  const palette = ['#14746f', '#355070', '#6d597a', '#bc6c25', '#4361ee', '#7a9e7e'];
  const index = Math.abs(hashString(seed)) % palette.length;
  return palette[index];
}

export function hashString(value) {
  return Array.from(String(value)).reduce((hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0);
}

export function parseAndNormalizeUrl(rawUrl, translate) {
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

export function formatUrlForDisplay(url) {
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

export function deriveNameFromUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname || url;
  } catch (error) {
    return url;
  }
}

export function formatDate(isoString, lang) {
  try {
    return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(isoString));
  } catch (error) {
    return isoString;
  }
}

export function createId(prefix) {
  const randomPart = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${randomPart}`;
}

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('File read failed'));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
