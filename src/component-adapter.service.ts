import { Injectable } from '@angular/core';
import {MaterialAutocompleteAdapter} from './material-autocomplete-adapter/material-autocomplete-adapter';
import {PrimeNGAutocompleteAdapter} from './primeng-autocomplete-adapter/primeng-autocomplete-adapter';

@Injectable({
  providedIn: 'root'
})

export class ComponentAdapterService {
  private componentMap = new Map<string, any>([
    ['material', MaterialAutocompleteAdapter],
    ['primeng', PrimeNGAutocompleteAdapter]
  ]);

  getCurrentTheme(): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--ui-library')
      .trim() || 'material';
  }

  getAutocompleteComponent(): any {
    let theme = this.getCurrentTheme();
    theme = this.cleanString(theme);
    return this.componentMap.get(theme) || PrimeNGAutocompleteAdapter;
  }

  cleanString(input: string): string {
    return input.replace(/^"|"$/g, '');
  }
}
