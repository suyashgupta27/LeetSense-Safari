(() => {
  // Content scripts are isolated from LeetCode's page JavaScript. Inject the
  // Monaco integration into the page's world so it can access window.monaco.
  const api = globalThis.browser || globalThis.chrome;
  if (!api?.runtime?.getURL) return;
  const script = document.createElement('script');
  script.src = api.runtime.getURL('bridge.js');
  script.onload = () => script.remove();
  (document.head || document.documentElement).appendChild(script);
})();
