export const trackEvent = (eventName) => {
  if (typeof window.clarity === "function") {
    window.clarity('event', eventName);
  } else {
    console.log(`Tracking skipped (Clarity missing): ${eventName}`);
  }

  if (typeof window.gtag === "function") {
    window.gtag('event', eventName);
  } else {
    console.log(`Tracking skipped (GA missing): ${eventName}`);
  }
};