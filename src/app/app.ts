import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AutocompleteConfigComponent} from '../ui-library-adapter/components/autocomplete/autocomplete-config.component';



@Component({
  selector: 'app-root',
  imports: [ButtonModule,AutocompleteConfigComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
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


    <app-autocomplete-config
      [config]="{
         panelWidth: '10px'
        }"
      [events]="{
          optionSelected: search.bind(this),
          opened: opened.bind(this)
        }"
    >
    </app-autocomplete-config>

  `
})

export class App {
  filteredOptions: any[] = [];

  options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' }
  ];

  search(event: any) {
    console.log(event);
    return
    const query = event.query.toLowerCase();
    this.filteredOptions = this.options.filter(opt =>
      opt.label.toLowerCase().includes(query)
    );
  }

  opened() {
    console.log('opened');
  }

}
