import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';

@Component({
  selector: 'material-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <mat-form-field>
      <mat-label>{{ config?.['label'] || 'Search' }}</mat-label>
      <input
        type="text"
        matInput
        [placeholder]="config?.['placeholder'] || ''"
        [formControl]="control"
        [matAutocomplete]="auto"
      >
      <mat-autocomplete #auto="matAutocomplete">
        @for (option of config?.['options'] ?? []; track option) {
          <mat-option [value]="option">
            {{ option }}
          </mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  `,
})
export class MaterialAutocompleteComponent extends MatAutocomplete implements AfterViewInit {
  @Input() config: Record<string, any> = {};
  @Input() events: Record<string, Function> = {};

  @ViewChild('auto', { static: true }) auto!: MatAutocomplete;
  @ViewChild(MatInput, { read: ElementRef }) input!: ElementRef<HTMLInputElement>;

  control = new FormControl('');

  ngAfterViewInit() {
    //  Apply dynamic inputs (skip template-only ones)
    Object.entries(this.config).forEach(([key, value]) => {
      if (!['options', 'label', 'placeholder'].includes(key)) {
        if (key in this.auto) {
          (this.auto as any)[key] = value;
        }
      }
    });

    //  Dynamic valueChanges binding for input control
    if (typeof this.events['valueChanges'] === 'function') {
      this.control.valueChanges.subscribe(val =>
        this.events['valueChanges'](val)
      );
    }

    //  Dynamic outputs from MatAutocomplete
    Object.entries(this.events).forEach(([event, handler]) => {
      if (event !== 'valueChanges' && typeof handler === 'function') {
        const emitter = (this.auto as any)[event];
        if (emitter?.subscribe) {
          emitter.subscribe((e: any) => handler(e));
        }
      }
    });
  }
}
