import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutocompleteConfigComponent} from './autocomplete/autocomplete-config.component';


@NgModule({
  imports: [CommonModule, AutocompleteConfigComponent],
  exports: [AutocompleteConfigComponent],
})
export class UiLibraryAdapterModule {
  static forRoot(library: 'primeng' | 'angular-material'): ModuleWithProviders<UiLibraryAdapterModule> {
    return {
      ngModule: UiLibraryAdapterModule,
      providers: [{ provide: 'UI_LIBRARY', useValue: library }],
    };
  }
}
