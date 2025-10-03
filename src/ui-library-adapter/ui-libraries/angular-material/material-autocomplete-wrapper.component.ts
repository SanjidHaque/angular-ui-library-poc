import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'material-autocomplete-wrapper',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocomplete,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteTrigger
  ],
  template: `
    <mat-form-field>
      <input matInput [formControl]="getActiveControl()" [matAutocomplete]="auto">

      <mat-autocomplete #auto="matAutocomplete">
        @for (option of options; track option) {
          <mat-option [value]="option">{{ option }}</mat-option>
        }
      </mat-autocomplete>

    </mat-form-field>
  `
})
export class MaterialAutocompleteWrapper {
  // Expose what component this wraps
  static readonly wrappedComponent = MatAutocomplete;
  static readonly wrapperConfig = {
    targetProperty: 'auto',
    passthroughProps: ['options', 'control']
  };

  private defaultControl = new FormControl('');
  control?: FormControl; // This will be set from parent via config
  options: any[] = [];
  @ViewChild('auto', { static: true }) auto!: MatAutocomplete;


  getActiveControl(): FormControl {
    return this.control || this.defaultControl;
  }
}
