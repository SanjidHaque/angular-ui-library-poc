import {
  Component,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {NgComponentOutlet} from '@angular/common';
import {ComponentAdapterService} from '../component-adapter.service';
import {AutocompleteAdapter} from '../autocomplete-adapter';

@Component({
  selector: 'app-autocomplete',
  imports: [
    NgComponentOutlet
  ],
  template: `
<!--        <ng-container *ngComponentOutlet="componentType; injector: componentInjector">-->
<!--        </ng-container>-->
    <ng-template #container></ng-template>
  `
})

export class Autocomplete {
  @Input() options: any[] = [];
  @Input() value: any;
  @Input() placeholder?: string;
  @Output() onSelectionChange = new EventEmitter<any>();
  @Output() onSearchInputChange = new EventEmitter<any>();

  // componentType: any;
  // componentInjector: Injector | undefined;
  //
  // constructor(
  //   private adapterService: ComponentAdapterService,
  //   private injector: Injector
  // ) {}
  //
  //
  // ngOnInit() {
  //   this.componentType = this.adapterService.getAutocompleteComponent();
  //
  //   this.componentInjector = Injector.create({
  //     providers: [
  //       {provide: 'options', useValue: this.options},
  //       {provide: 'value', useValue: this.value},
  //       {provide: 'placeholder', useValue: this.placeholder}
  //     ],
  //     parent: this.injector
  //   });
  // }

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  private componentRef!: ComponentRef<AutocompleteAdapter>;

  constructor(private adapterService: ComponentAdapterService) {}

  ngOnInit() {
    this.loadComponent();
  }

  ngOnChanges() {
    if (this.componentRef) {
      this.updateInputs();
    }
  }

  private loadComponent() {
    const componentType = this.adapterService.getAutocompleteComponent();
    this.container.clear();
    this.componentRef = this.container.createComponent<AutocompleteAdapter>(componentType);

    this.updateInputs();
    this.componentRef.instance.onSelectionChange.subscribe((val) => {
      this.onSelectionChange.emit(val);
    });
    this.componentRef.instance.onSearchInputChange.subscribe((val) => {
      this.onSearchInputChange.emit(val);
    })
  }

  private updateInputs() {
    this.componentRef.instance.options = this.options;
    this.componentRef.instance.selectedValue = this.value;
    this.componentRef.instance.placeholder = this.placeholder;
  }

}
