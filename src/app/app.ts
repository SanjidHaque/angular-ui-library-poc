import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AutocompleteConfigComponent} from '../ui-library-adapter/components/autocomplete/autocomplete-config.component';



@Component({
  selector: 'app-root',
  imports: [ButtonModule,AutocompleteConfigComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
<!--    For Primeng use this element-->

<!--    <app-autocomplete-config-->
<!--      [config]="{-->
<!--        suggestions: options,-->
<!--        minLength: 2-->
<!--      }"-->
<!--      [events]="{-->
<!--        onSelect: search.bind(this),-->
<!--        completeMethod: search.bind(this)-->
<!--      }"-->
<!--    >-->
<!--    </app-autocomplete-config>-->


<!--    For Angular-Material use this element-->
    <app-autocomplete-config
      [config]="{
         panelWidth: '200px',
         options: options,
         control: autocompleteControl
        }"
      [events]="{
          optionSelected: search.bind(this),
          opened: opened.bind(this)
        }"
    >
    </app-autocomplete-config>
  `,
  styles: `
    :host {
      padding: 20px;
    }
  `
})

export class App {
  autocompleteControl = new FormControl('');
  filteredOptions: any[] = [];

  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  constructor() {
    this.autocompleteControl.valueChanges.subscribe(value => {
      console.log('Form control value changed:', value);
    });
  }

  search(event: any) {
    console.log('Option selected:', event);
  }

  opened() {
    console.log('Autocomplete opened');
  }
}
