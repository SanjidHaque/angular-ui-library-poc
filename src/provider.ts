import { Provider } from '@angular/core';
import {UI_LIBRARY, UiLibrary} from './ui-library-adapter/core/ui-library.token';

export function provideUiLibrary(library: UiLibrary): Provider {
  return { provide: UI_LIBRARY, useValue: library };
}
