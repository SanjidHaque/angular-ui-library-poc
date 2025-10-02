import { Type } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import {MaterialAutocompleteComponent} from './material-autocomplete.component';

export const MATERIAL_COMPONENTS: Record<string, Type<any>> = {
  'autocomplete': MaterialAutocompleteComponent,
};
