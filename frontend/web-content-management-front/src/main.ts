import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, Routes, withDebugTracing, withRouterConfig } from '@angular/router';
import {WebsiteSetupComponentComponent} from './app/components/website-setup-component/website-setup-component.component';
import {HomeComponent} from './app/components/home/home.component';
import {MainComponent} from './app/components/main/main.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'website-setup', component: WebsiteSetupComponentComponent},
  {path:'home',component:HomeComponent},
  {path:'main',component:MainComponent},
  { path: 'main/:id', component: MainComponent }
];

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes, withDebugTracing(), withRouterConfig({ paramsInheritanceStrategy: 'always' }))
  ]
})
  .catch((err) => console.error());
