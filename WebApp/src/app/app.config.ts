import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { API_BASE_URL } from '../shared/service-proxies/service-proxies';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
} from '@angular/common/http';

export function getRemoteServiceBaseUrl(): string {
  // let url = (window as any).location.host;
  // if (url.indexOf("localhost") >= 0) {
    // return 'https://localhost:7104';
  // } else {
    return 'https://hackathon.tryasp.net';
  // }
}

export const appConfig: ApplicationConfig = {
  providers: [
    NoopAnimationsModule,
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
    provideHttpClient(withFetch()),
    BrowserModule,
    BrowserAnimationsModule,
  ],
};
