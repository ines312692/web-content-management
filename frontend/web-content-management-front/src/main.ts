import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';

import { HomeComponent } from './app/components/home/home.component';
import { MainComponent } from './app/components/main/main.component';
import { WebsiteSetupComponent } from './app/components/website-setup/website-setup.component';
import { PagesListComponent } from './app/components/page-list/page-list.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { RegisterComponent } from './app/components/register/register.component';

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'website-setup', component: WebsiteSetupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'main', component: MainComponent },
  { path: 'main/:id', component: MainComponent },
  { path: 'pages-list/:id', component: PagesListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent) },
  { path: 'database-editor/:id', loadComponent: () => import('./app/components/database-editor/database-editor.component').then(m => m.DatabaseEditorComponent) },
];

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideRouter(appRoutes),
    importProvidersFrom(ReactiveFormsModule)
  ]
}).catch((err) => console.error(err));