import { Type } from '@angular/core';
import {AutoComplete} from 'primeng/autocomplete';


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


const componentRegistry: Record<string, Type<any>> = {
  'p-autoComplete': AutoComplete,
  // add more mappings here if needed
};

export function getComponentBindingsBySelector(selector: string) {
  const component = componentRegistry[selector];
  if (!component) {
    throw new Error(`Component not found for selector: ${selector}`);
  }

  const cmpDef: any = (component as any).ɵcmp;
  if (!cmpDef) {
    throw new Error('Not an Angular component or metadata not available');
  }

  return {
    selector: cmpDef.selectors[0][0],
    inputs: Object.keys(cmpDef.inputs),
    outputs: Object.keys(cmpDef.outputs),
  };
}
