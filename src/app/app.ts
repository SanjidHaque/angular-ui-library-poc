import {ChangeDetectorRef, Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AutocompleteConfigComponent} from '../ui-library-adapter/components/autocomplete/autocomplete-config.component';
import {AutoComplete} from 'primeng/autocomplete';



@Component({
  selector: 'app-root',
  imports: [ButtonModule,AutocompleteConfigComponent, AutoComplete, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
<!--    change token string - angular-material or primeng in app.config.ts-->
<!--    primeng related bindings-->

    <app-autocomplete-config
      [config]="{
        suggestions: filteredOptions
      }"
      [events]="{
        completeMethod: search.bind(this)
      }"
    >
    </app-autocomplete-config>


<!--   angular-material related bindings-->
<!--    <app-autocomplete-config-->
<!--      [config]="{-->
<!--         panelWidth: '200px',-->
<!--         options: options,-->
<!--         control: autocompleteControl-->
<!--        }"-->
<!--      [events]="{-->
<!--          optionSelected: search.bind(this),-->
<!--          opened: opened.bind(this)-->
<!--        }"-->
<!--    >-->
<!--    </app-autocomplete-config>-->
  `,
  styles: ``
})

export class App {
  autocompleteControl = new FormControl('');
  filteredOptions: any[] = [];

  options = ['Angular', 'Ant Design', 'Angular JS', 'Anthropic'];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.autocompleteControl.valueChanges.subscribe(value => {

    });
  }


  search(event: any) {
    this.filteredOptions = this.options.filter(item => item.toLowerCase().includes(event.query.toLowerCase()));
    this.changeDetectorRef.detectChanges();
  }

  opened() {
    console.log('Autocomplete opened');
  }
}
