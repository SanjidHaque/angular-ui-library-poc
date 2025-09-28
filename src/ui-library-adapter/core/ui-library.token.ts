import { InjectionToken } from '@angular/core';

export type UiLibrary = 'primeng' | 'angular-material';

export const UI_LIBRARY = new InjectionToken<UiLibrary>('UI_LIBRARY');
