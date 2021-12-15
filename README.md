# mf-dynamic-remote-component

Library for loading in dynamic remote components when utilizing webpack Module Federation

* No dependency on React
* Keep remote modules in a cache on the window object
* Support for both lazy/suspense or loadable components and other promise based libraries

## Examples 
### Loadable (No fallback):
```js
import React from 'react';
import { RemoteComponent } from '@paypalcorp/mf-dynamic-remote-component';
import loadable from '@loadable/component';

export default function RemoteHostComponent(config) {
  const Component = loadable(() => RemoteComponent(config));
  return (
    <>
      <Component
        config={config}
        financialInstruments={financialInstruments}
        otherProps={otherProps}
      />
    </>
  );

}
```

### Loadable:
```js
import React from 'react';
import { RemoteComponent } from '@paypalcorp/mf-dynamic-remote-component';
import loadable from '@loadable/component';
import { Col } from '@paypalcorp/pp-react-grid';
import { LoadingSpinner } from '@paypalcorp/pp-react-loading-spinner';

export default function RemoteHostComponent(config) {
  const Component = loadable(() => RemoteComponent(config), {
    fallback: (
      <Col>
        <LoadingSpinner />
      </Col>
    )
  });
  return (
    <>
      <Component
        config={config}
        financialInstruments={financialInstruments}
        otherProps={otherProps}
      />
    </>
  );

}
```
### Suspense:
```js
import React, { lazy, Suspense} from 'react';
import { RemoteComponent } from '@paypalcorp/mf-dynamic-remote-component';
import { Col } from '@paypalcorp/pp-react-grid';
import { LoadingSpinner } from '@paypalcorp/pp-react-loading-spinner';

export default function RemoteHostComponent(config) {
  return (
    <Suspense fallback={
      <Col>
        <LoadingSpinner />
      </Col>
    }>
      <Component
        config={config ? config.payout : mfConfig.payout}
        financialInstruments={financialInstruments}
      />
    </Suspense>
  );

}
```
