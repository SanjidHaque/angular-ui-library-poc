import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Autocomplete} from '../autocomplete/autocomplete';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import { AutocompleteConfigComponent } from '../autocomplete/autocomplete-config.component';


@Component({
  selector: 'app-root',
  imports: [ButtonModule,AutocompleteConfigComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
<!--    <app-autocomplete-->
<!--      [options]="filteredSearchOption"-->
<!--      [value]="selectedValue"-->
<!--      (onSelectionChange)="onSelect($event)"-->
<!--      (onSearchInputChange)="onSearchInputChanged($event)">-->
<!--    </app-autocomplete>-->

<!--        <app-autocomplete-->
<!--          [minlength]="2"-->
<!--          [readonly]="true"-->
<!--          [suggestions]="options"-->
<!--          [field]="'name'"-->
<!--          [dropdown]="true"-->
<!--          (onSelect)="onSelect($event)"-->
<!--          (onClear)="onClear()"-->
<!--          (completeMethod)="search($event)"-->
<!--        >-->
<!--        </app-autocomplete>-->


<!--<app-autocomplete-config-->
<!--  [config]="{-->
<!--        suggestions: options,-->
<!--        minLength: 2-->
<!--      }"-->
<!--  [events]="{-->
<!--        onSelect: onSelect,-->
<!--        completeMethod: search-->
<!--      }"-->
<!--&gt;-->
<!--</app-autocomplete-config>-->
  `
})

export class App {
  // filteredSearchOption: any[] = [];
  //
  // searchOptions = [
  //   { value: 1, label: 'Option 1' },
  //   { value: 2, label: 'Option 2' }
  // ];
  //
  // selectedValue: any;
  //
  // onSelect(value: any) {
  //   console.log(value);
  // }
  //
  // onSearchInputChanged(value: any) {
  //   console.log(value);
  //   this.filteredSearchOption = this._filter(value);
  // }
  //
  // private _filter(value: any) {
  //   const filterValue = value.toLowerCase();
  //   return this.searchOptions.filter(option => option.label.toLowerCase()?.includes(filterValue));
  // }


  selectedValue: any;
  filteredOptions: any[] = [];

  options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' }
  ];

  search(event: any) {
    console.log(event);
    const query = event.query.toLowerCase();
    this.filteredOptions = this.options.filter(opt =>
      opt.label.toLowerCase().includes(query)
    );
  }

  onSelect(event: any) {
    console.log('Selected:', event);
  }

  onClear() {
    console.log('Cleared');
  }

}
