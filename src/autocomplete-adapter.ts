import {EventEmitter} from '@angular/core';

export interface AutocompleteAdapter {
  options: any[];
  selectedValue: any;
  placeholder?: string;
  onSelectionChange: EventEmitter<any>;
  onSearchInputChange: EventEmitter<any>;
 // pluginConfig: T
}
