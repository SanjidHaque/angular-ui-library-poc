import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  OnChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { UiLibraryService } from '../../core/ui-library.service';
import { getComponentBindings } from '../../core/component-bindings.util';

@Component({
  selector: 'app-autocomplete-config',
  standalone: true,
  templateUrl: './autocomplete-config.component.html',
})
export class AutocompleteConfigComponent implements AfterViewInit, OnChanges {
  @Input() config: any = {};
  @Input() events: Record<string, Function> = {};

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;
  private bindings!: { selector: string; inputs: string[]; outputs: string[] };

  constructor(private uiLibraryService: UiLibraryService) {}

  ngAfterViewInit() {
    const component = this.uiLibraryService.getComponent('autocomplete');
    this.bindings = getComponentBindings(component);

    this.container.clear();
    this.componentRef = this.container.createComponent(component);

    this.applyBindings();
  }

  ngOnChanges() {
    if (this.componentRef) {
      this.applyBindings();
    }
  }

  private applyBindings() {
    // Inputs
    for (const input of this.bindings.inputs) {
      if (this.config[input] !== undefined) {
        (this.componentRef.instance as any)[input] = this.config[input];
      }
    }

    // Outputs
    for (const output of this.bindings.outputs) {
      const emitter = (this.componentRef.instance as any)[output];
      if (emitter?.subscribe && this.events[output]) {
        emitter.subscribe((e: any) => this.events[output](e));
      }
    }
  }
}
