import { Inject, Injectable } from '@angular/core';
import { UI_LIBRARY, UiLibrary } from './ui-library.token';
import { PRIMENG_COMPONENTS } from '../ui-libraries/primeng/primeng.registry';
import { MATERIAL_COMPONENTS } from '../ui-libraries/angular-material/material.registry';
import { Type } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiLibraryService {
  private registry: Record<string, Type<any>>;

  constructor(@Inject(UI_LIBRARY) private library: UiLibrary) {
    if (library === 'primeng') {
      this.registry = PRIMENG_COMPONENTS;
    } else if (library === 'angular-material') {
      this.registry = MATERIAL_COMPONENTS;
    } else {
      throw new Error(`Unknown UI library: ${library}`);
    }
  }

  getComponent(name: string): Type<any> {
    const cmp = this.registry[name];
    if (!cmp) throw new Error(`Component not found: ${name}`);
    return cmp;
  }
}
