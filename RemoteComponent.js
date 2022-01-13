import getDynamicScript from './getDynamicScript';
import getRemoteModuleId from './utils/getRemoteModuleId';
import loadComponent from './loadDynamicComponent';

const loadingPromise = (remoteModule) =>
  new Promise(async (resolve, reject) => {
    try {
      await getDynamicScript(remoteModule);
      const _module = await loadComponent(
        remoteModule.path,
        remoteModule.scope,
        remoteModule.module,
      );

      resolve(_module);
    } catch (e) {
      console.log(`mf-dynamic-remote-component: error getting remote ${e}`);
      reject(e);
    }
  });
/**
 *
 * @param {Object} remoteModule remote module config containing path, scope and module
 * @return {Promise} promise that resolves to module
 */
export default function RemoteComponent(remoteModule) {
  window.remoteMFStore = window.remoteMFStore || {};
  const id = getRemoteModuleId(remoteModule);
  const existingModule = window.remoteMFStore[id];
  if (existingModule) {
    return existingModule;
  }
  window.remoteMFStore[id] = loadingPromise(remoteModule);
  return window.remoteMFStore[id];
}
