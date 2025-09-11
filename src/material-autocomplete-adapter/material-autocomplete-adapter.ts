import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AutocompleteAdapter} from '../autocomplete-adapter';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


export class MaterialAutocompleteAdapterType {

}

@Component({
  selector: 'material-autocomplete-adapter',
  imports: [MatAutocompleteModule, FormsModule, ReactiveFormsModule],
  template: `
    <input type="text"
           [matAutocomplete]="auto"
           (keyup)="onSearchInputChange.emit($any($event.target).value)">
    <mat-autocomplete #auto="matAutocomplete"
                      (optionSelected)="onSelectionChange.emit($event)">
      @for (option of options; track $index) {
        <mat-option [value]="option.label">
          {{ option.label }}
        </mat-option>
      }
    </mat-autocomplete>
  `
})

export class MaterialAutocompleteAdapter implements AutocompleteAdapter {
  @Input() options: any[] = [];
  @Input() selectedValue: any;
  @Output() onSelectionChange = new EventEmitter<any>();
  @Output() onSearchInputChange = new EventEmitter<any>();

  pluginConfig: MaterialAutocompleteAdapterType;
  constructor(private formBuilder: FormBuilder) {
    this.pluginConfig = new MaterialAutocompleteAdapterType();
  }

}
