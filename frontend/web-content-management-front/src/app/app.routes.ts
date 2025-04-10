// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageManagementComponent } from './page-management/page-management.component';
import { WebsiteSetupComponentComponent } from './website-setup-component/website-setup-component.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'page-management', component: PageManagementComponent },
  { path: 'website-setup', component: WebsiteSetupComponentComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
