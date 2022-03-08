<h1 align="center">mf-dynamic-remote-component</h1>

<p align="center" style="font-size: 1.2rem">Loading in dynamic remote <a href="https://webpack.js.org/concepts/module-federation/" target="_blank">federated</a> components made easy</p>
<br>
<br>

Open source version: https://github.com/MichaelDurfey/mf-dynamic-remote-component

## Features

- Keep remote modules in a cache on the window object
- Promise based
- 0 dependencies
- Support for both lazy/suspense, loadable or others

## Get started

```bash
npm install mf-dynamic-remote-component
```

## Examples

```js
// config object example
{
  "path": "/client/App2RemoteEntry.js", // Path to remote container entry. Ideally CDN location in live environments.
  "scope": "App2", // Container scope name
  "module": "./MyRemoteComponent" // Shared module
}
```

### Suspense

```js
import React, {lazy, Suspense} from 'react';
import {RemoteComponent} from 'mf-dynamic-remote-component';

export default function RemoteHostComponent(config) {
  const Component = React.lazy(() => RemoteComponent(config));
  return (
    <Suspense
      fallback={
        <div class="col">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      }
    >
      <Component config={config} customProps={customProps} />
    </Suspense>
  );
}
```

### Loadable (No fallback)

```js
import React from 'react';
import {RemoteComponent} from 'mf-dynamic-remote-component';
import loadable from '@loadable/component';

export default function RemoteHostComponent(config) {
  const Component = loadable(() => RemoteComponent(config));
  return (
    <>
      <Component
        config={config}
        customProps={customProps}
        otherProps={otherProps}
      />
    </>
  );
}
```

### Loadable:

```js
import React from 'react';
import {RemoteComponent} from 'mf-dynamic-remote-component';
import loadable from '@loadable/component';

export default function RemoteHostComponent(config) {
  const Component = loadable(() => RemoteComponent(config), {
    fallback: (
      <div class="col">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    ),
  });
  return (
    <>
      <Component
        config={config}
        customProps={customProps}
        otherProps={otherProps}
      />
    </>
  );
}
```
