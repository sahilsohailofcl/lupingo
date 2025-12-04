// Compatibility shim to expose legacy react-dom exports expected by some packages
try {
  const reactDom = require('react-dom');
  const reactDomClient = require('react-dom/client');

  module.exports = Object.assign({}, reactDom, {
    hydrate: reactDom.hydrate || reactDomClient.hydrateRoot || (() => {}),
    unmountComponentAtNode: reactDom.unmountComponentAtNode || ((container) => {
      if (reactDomClient && reactDomClient.createRoot) {
        try { reactDomClient.createRoot(container).unmount(); } catch (e) {}
      }
    })
  });
} catch (e) {
  // Fallback — export whatever react-dom provides
  module.exports = require('react-dom');
}
