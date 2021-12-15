export default function remoteModuleIdentifier({path, module, scope}) {
  return [path, module, scope].join('');
}
