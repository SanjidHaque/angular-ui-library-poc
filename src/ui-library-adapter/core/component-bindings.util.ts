import { Type } from '@angular/core';

export function getComponentBindings<T>(component: Type<T>) {
  // Check if component has a wrappedComponent property
  const wrappedComponent = (component as any).wrappedComponent;

  if (wrappedComponent) {
    // Use the wrapped component's bindings
    const cmpDef: any = wrappedComponent.ɵcmp;
    if (!cmpDef) {
      throw new Error('Wrapped component metadata not available');
    }
    return {
      cmpDef,
      selector: cmpDef.selectors[0][0],
      inputs: Object.keys(cmpDef.inputs),
      outputs: Object.keys(cmpDef.outputs),
      isWrapper: true,
    };
  }

  // Default behavior for non-wrapper components
  const cmpDef: any = (component as any).ɵcmp;
  if (!cmpDef) {
    throw new Error('Not an Angular component or metadata not available');
  }

  return {
    cmpDef,
    selector: cmpDef.selectors[0][0],
    inputs: Object.keys(cmpDef.inputs),
    outputs: Object.keys(cmpDef.outputs),
    isWrapper: false,
  };
}
