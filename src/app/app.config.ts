import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {provideUiLibrary} from '../provider';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideNoopAnimations(),
    provideUiLibrary('angular-material') //angular-material or primeng
  ]
};
