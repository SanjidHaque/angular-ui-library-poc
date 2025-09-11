import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  EventEmitter,
  OnInit,
  Type,
} from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import {getComponentBindings} from '../component-bindings.util';
import {DynamicBindings} from './dynamic-bindings'; // PrimeNG’s real component class


@Component({
  selector: 'app-autocomplete',
  template: `<ng-template #container></ng-template>`,
})
export class AutocompleteComponent  extends DynamicBindings  implements OnInit {
  // @ts-ignore
  // @Input() [key: string]: any;   // TS allows index signatures
  // // @ts-ignore
  // @Output() [key: string]: any;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;

  ngOnInit() {
    this.loadComponent(AutoComplete); // dynamically attach PrimeNG component
  }

  private loadComponent(cmpType: Type<any>) {
    this.container.clear();
    this.componentRef = this.container.createComponent(cmpType);

    const { inputs, outputs } = getComponentBindings(cmpType);

    // 🔹 Forward all inputs: allow <app-autocomplete [prop]="val">
    inputs.forEach(name => {
      Object.defineProperty(this, name, {
        set: (val: any) => this.componentRef.setInput(name, val),
        configurable: true,
        enumerable: true,
      });
    });

    // 🔹 Forward all outputs: allow <app-autocomplete (event)="handler($event)">
    outputs.forEach(name => {
      const emitter = (this.componentRef.instance as any)[name];
      if (emitter instanceof EventEmitter) {
        (this as any)[name] = emitter; // re-expose directly
      }
    });
  }
}
