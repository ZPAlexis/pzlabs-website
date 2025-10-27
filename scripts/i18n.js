i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    debug: true, // Turn off in production
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt'],
    load: 'languageOnly',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    }, interpolation: {
    escapeValue: false
    }
  }, function(err, t) {
    if (err) return console.error(err);
    updateContent();
  });

export function updateContent() {
  // Regular text-only translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18next.t(key);
  });

  // HTML translations (safe only if you trust your translation source)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    el.innerHTML = i18next.t(key);
  });
}