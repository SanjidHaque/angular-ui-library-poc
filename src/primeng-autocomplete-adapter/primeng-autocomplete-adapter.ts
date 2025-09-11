import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AutocompleteAdapter} from '../autocomplete-adapter';
import { AutoCompleteModule, AutoComplete } from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {getComponentBindings, getComponentBindingsBySelector} from '../component-bindings.util';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-primeng-autocomplete-adapter',
  imports: [AutoCompleteModule, FormsModule],
  template: `
    <p-autoComplete
      [(ngModel)]="selectedValue"
      [suggestions]="options"
      (completeMethod)="onSearchInputChange.emit($event.query)"
    >
    </p-autoComplete>
  `
})

export class PrimeNGAutocompleteAdapter implements AutocompleteAdapter {
  @Input() options: any[] = [];
  @Input() selectedValue: any;
  @Input() placeholder?: string;
  @Output() onSelectionChange = new EventEmitter<any>();
  @Output() onSearchInputChange = new EventEmitter<any>();


  ngOnInit() {
    console.log(getComponentBindings(AutoComplete));
    console.log(getComponentBindingsBySelector('p-autoComplete'));
  }

}
