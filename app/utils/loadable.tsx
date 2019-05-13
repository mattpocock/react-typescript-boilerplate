import React, { lazy, Suspense } from 'react';

function loadable<Props>(
  importFunc: () => Promise<any>,
  { fallback = null }: { fallback: any } = { fallback: null },
) {
  const LazyComponent = lazy(importFunc);

  return (props: Props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default loadable;
