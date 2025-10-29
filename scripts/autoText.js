function runAutoText() {
  const coverTextHTML = document.querySelector('.js-cover-text');
  const coverBarBlinkHTML = document.querySelector('.js-cover-bar-blink');
  const listBarBlinkHTML = document.querySelectorAll('.js-list-bar-blink');

  const targets = document.querySelectorAll('.js-list-text-1, .js-list-text-2, .js-list-text-3');

  let coverTextOptions = i18next.t('index.intro-cover-options', { returnObjects: true });

  let coverText = '';
  let i1 = 0;

  function chooseCoverText() {
    coverText = coverTextOptions[i1];
    i1 = (i1 + 1) % coverTextOptions.length;
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ----------------
  // Blink Controller
  // ----------------
  let coverBlinkActive = true;

  async function startCoverBarBlink() {
    while (true) {
      if (coverBlinkActive) {
        coverBarBlinkHTML.innerHTML = '|';
        await sleep(800);
        coverBarBlinkHTML.innerHTML = '&nbsp;';
        await sleep(400);
      } else {
        coverBarBlinkHTML.innerHTML = '|';
        await sleep(400);
      }
    }
  }

  async function startListBarBlink() {
    while (true) {
      listBarBlinkHTML.forEach(el => el.innerHTML = '|');
      await sleep(800);
      listBarBlinkHTML.forEach(el => el.innerHTML = '&nbsp;');
      await sleep(400);
    }
  }

  // ----------------
  // Typing Logic
  // ----------------
  const controller = { stopped: false };
  const listControllers = new WeakMap();
  async function typeText(textString, html, ms) {
    const controller = { stopped: false };
    listControllers.set(html, controller);
    for (let i = 0; i < textString.length; i++) {
      const currentController = listControllers.get(html);
      if (currentController !== controller || controller.stopped) break;
      html.innerHTML += textString[i];
      await sleep(ms);
    }
  }

  async function eraseCoverText() {
    while (coverTextHTML.innerHTML.length > 0) {
      coverTextHTML.innerHTML = coverTextHTML.innerHTML.slice(0, -1);
      await sleep(60);
    }
  }

  // ----------------
  // Main Orchestrator
  // ----------------
  async function startCoverText() {
    chooseCoverText();

    while (true) {
      await sleep(200);

      blinkActive = false;
      await typeText(coverText, coverTextHTML, 80, controller);
      blinkActive = true;

      await sleep(2000);

      blinkActive = false;
      await eraseCoverText();
      blinkActive = true;
      
      chooseCoverText();
    }
  }

  const autoTextObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startListText(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  targets.forEach(target => autoTextObserver.observe(target));

  function startListText(element) {
    const key = element.dataset.text;
    const text = i18next.t(key);
    typeText(text, element, 60);
  }
  
  function restartListTexts() {
    targets.forEach ((element) => {
      const controller = listControllers.get(element);
      if (controller) controller.stopped = true;

      element.innerHTML = '';
      const key = element.dataset.text;
      const text = i18next.t(key);
      typeText(text, element, 60);
    });
  }
  
  i18next.on('languageChanged', () => {
    coverTextOptions = i18next.t('index.intro-cover-options', { returnObjects: true });
    controller.stopped = true;
    coverTextHTML.innerHTML = '';
    i1 = 0;
    restartListTexts()
  });
  
    startCoverBarBlink();
    startCoverText();
    startListBarBlink();
}

if (i18next.isInitialized) {
  // i18next already finished loading
  runAutoText();
} else {
  // wait until it finishes
  i18next.on('initialized', runAutoText);
}