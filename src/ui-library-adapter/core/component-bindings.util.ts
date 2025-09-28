import { Type } from '@angular/core';

export function getComponentBindings<T>(component: Type<T>) {
  const cmpDef: any = (component as any).ɵcmp;
  if (!cmpDef) {
    throw new Error('Not an Angular component or metadata not available');
  }

  return {
    cmpDef,
    selector: cmpDef.selectors[0][0],
    inputs: Object.keys(cmpDef.inputs),
    outputs: Object.keys(cmpDef.outputs),
  };
}
