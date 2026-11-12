/**
 * Theme preference shared by every tool on this origin: 'system' | 'light' | 'dark'.
 * - 'system' (default) follows the OS live via CSS prefers-color-scheme and the
 *   media-qualified <meta name="theme-color"> tags, so no JS listener is needed.
 * - 'light' / 'dark' force a theme through <html data-theme>.
 * index.html applies the stored preference before first paint; this module wires up
 * the switch and keeps tabs in sync. See DESIGN.md.
 *
 * Markup expected (see index.html):
 *   <div class="segmented theme-switch" role="radiogroup" data-theme-switch>
 *     <button role="radio" data-theme-value="system|light|dark" class="segmented__item">…</button>
 *   </div>
 *   <button class="btn btn--ghost btn--icon theme-cycle" data-theme-cycle>…</button>
 */
export const THEME_STORAGE_KEY = 'theme-preference';
const ORDER = ['system', 'light', 'dark'];
const LABELS = { system: 'System', light: 'Light', dark: 'Dark' };
const META_COLORS = { light: '#fafafa', dark: '#09090b' };

const normalize = v => (v === 'light' || v === 'dark' ? v : 'system');

export function getThemePreference() {
  return normalize(document.documentElement.getAttribute('data-theme-pref'));
}

function apply(pref) {
  const root = document.documentElement;
  root.setAttribute('data-theme-switching', '');
  root.setAttribute('data-theme-pref', pref);
  if (pref === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', pref);

  document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
    const scheme = meta.media.includes('dark') ? 'dark' : 'light';
    meta.content = META_COLORS[pref === 'system' ? scheme : pref];
  });

  requestAnimationFrame(() => requestAnimationFrame(() => root.removeAttribute('data-theme-switching')));
  syncControls(pref);
}

export function setThemePreference(pref) {
  pref = normalize(pref);
  try {
    if (pref === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    /* storage unavailable — still apply for this session */
  }
  apply(pref);
}

function syncControls(pref) {
  document.querySelectorAll('[data-theme-switch] [data-theme-value]').forEach(btn => {
    const on = btn.dataset.themeValue === pref;
    btn.setAttribute('aria-checked', String(on));
    btn.tabIndex = on ? 0 : -1;
  });
  const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
  document.querySelectorAll('[data-theme-cycle]').forEach(btn => {
    btn.setAttribute('aria-label', `Theme: ${LABELS[pref]}. Switch to ${LABELS[next]}`);
    btn.title = `Theme: ${LABELS[pref]}`;
    btn.querySelectorAll('[data-theme-icon]').forEach(icon => {
      // SVG elements have no .hidden property, so set the attribute directly.
      icon.toggleAttribute('hidden', icon.dataset.themeIcon !== pref);
    });
  });
}

export function initThemeSwitch() {
  document.querySelectorAll('[data-theme-switch]').forEach(group => {
    const radios = [...group.querySelectorAll('[data-theme-value]')];
    radios.forEach(btn => btn.addEventListener('click', () => setThemePreference(btn.dataset.themeValue)));
    group.addEventListener('keydown', e => {
      const delta = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0;
      if (!delta) return;
      e.preventDefault();
      const i = ORDER.indexOf(getThemePreference());
      const target = ORDER[(i + delta + ORDER.length) % ORDER.length];
      setThemePreference(target);
      radios.find(r => r.dataset.themeValue === target)?.focus();
    });
  });

  document.querySelectorAll('[data-theme-cycle]').forEach(btn =>
    btn.addEventListener('click', () => {
      const i = ORDER.indexOf(getThemePreference());
      setThemePreference(ORDER[(i + 1) % ORDER.length]);
    }),
  );

  window.addEventListener('storage', e => {
    if (e.key === THEME_STORAGE_KEY || e.key === null) apply(normalize(e.newValue));
  });

  syncControls(getThemePreference());
}
