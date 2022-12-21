import getRemoteModuleId from './utils/getRemoteModuleId';

/**
 *
 * @param {Object} remoteModule contains the config with path to load the remote container
 * @summary Appends a dynamic script element pointing to the remote container
 * @return {Promise}
 */
export default function getDynamicScript(remoteModule) {
  const id = getRemoteModuleId(remoteModule);

  const existingElement = document.getElementById(id);

  if (existingElement) {
    if (window[remoteModule.scope]) {
      return Promise.resolve(true);
    }
    return new Promise((resolve) => {
      existingElement.onload = (e) => {
        resolve(true);
      };
    });
  }

  const element = document.createElement('script');

  element.src = remoteModule.path;
  element.type = 'text/javascript';
  element.async = true;
  element.id = id;

  document.head.appendChild(element);

  return new Promise((resolve, reject) => {
    element.onload = () => {
      resolve(true);
    };
    element.onerror = () => {
      // eslint-disable-next-line no-console
      console.error(`Dynamic Script Error: ${remoteModule.path}`);
      reject(new Error(`Dynamic Script Error: ${remoteModule.path}`));
    };
  });
}
