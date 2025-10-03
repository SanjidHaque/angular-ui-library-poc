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
  template: `<ng-template #container></ng-template>`,
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
    let target = this.componentRef.instance;
    const componentClass = this.componentRef.componentType;
    const wrapperConfig = (componentClass as any).wrapperConfig;

    if (wrapperConfig) {
      const wrapper = target;
      target = (target as any)[wrapperConfig.targetProperty];

      // Apply passthrough properties to wrapper
      for (const prop of wrapperConfig.passthroughProps) {
        if (this.config[prop] !== undefined) {
          (wrapper as any)[prop] = this.config[prop];
        }
      }
    }

    // Bind dynamic inputs
    for (const input of this.bindings.inputs) {
      if (this.config[input] !== undefined) {
        (target as any)[input] = this.config[input];
      }
    }

    // Bind dynamic outputs
    for (const output of this.bindings.outputs) {
      const emitter = (target as any)[output];
      if (emitter?.subscribe && this.events[output]) {
        emitter.subscribe((e: any) => this.events[output](e));
      }
    }
  }
}
