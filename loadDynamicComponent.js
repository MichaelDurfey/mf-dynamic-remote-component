/* eslint-disable no-undef */

// https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers
/**
 * @param {String} path remote container scope path
 * @param {String} scope container scope
 * @param {*} module provided module to fetch from container
 * @return {Module} the remote module
 */
export default async function loadComponent(path, scope, module) {
  try {
    // Initializes the shared scope.
    // Fills known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // eslint-disable-next-line camelcase
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  } catch (e) {
    throw new Error(`Error loading remote module. 
      Please check the url: ${path}, scope: ${scope} and module: ${module} 
      -----------------------------------------------
      ${e}`);
  }
}
