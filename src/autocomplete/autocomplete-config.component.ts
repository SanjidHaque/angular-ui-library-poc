import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AutoComplete} from 'primeng/autocomplete';
import {getComponentBindings} from '../component-bindings.util';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-autocomplete-config',
  template: `<ng-template #container></ng-template>`,
})

export class AutocompleteConfigComponent implements AfterViewInit, OnChanges {
  @Input() config: any = {};
  @Input() events: Record<string, Function> = {};

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;
  private bindings!: { selector: string; inputs: string[]; outputs: string[] };

  ngAfterViewInit() {
    // create the component after view is ready
    this.bindings = getComponentBindings(AutoComplete);
    this.container.clear();
    this.componentRef = this.container.createComponent(AutoComplete);

    this.applyBindings(); // initial binding
  }

  ngOnChanges() {
    if (this.componentRef) {
      this.applyBindings(); // re-bind when inputs change
    }
  }

  private applyBindings() {
    console.log('Applying bindings...');

    // Inputs
    for (const input of this.bindings.inputs) {
      if (this.config[input] !== undefined) {
        console.log(`Setting input ${input} =`, this.config[input]);
        (this.componentRef.instance as any)[input] = this.config[input];
      }
    }

    // Outputs
    for (const output of this.bindings.outputs) {
      const emitter = (this.componentRef.instance as any)[output];
      if (emitter?.subscribe && this.events[output]) {
        console.log(`Subscribing to output ${output}`);
        emitter.subscribe((e: any) => {
          console.log(`Output ${output} fired:`, e);
          this.events[output](e);
        });
      }
    }
  }
}
