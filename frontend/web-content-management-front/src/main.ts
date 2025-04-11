import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, withDebugTracing, withRouterConfig } from '@angular/router';
import { routes } from './app/app.routes';  // Import your routes from app.routes.ts

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes, withDebugTracing(), withRouterConfig({ paramsInheritanceStrategy: 'always' }))
  ]
})
  .catch((err) => console.error(err));