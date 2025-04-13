// src/app/app.routes.ts
import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {MainComponent} from './components/main/main.component';
import {WebsiteSetupComponent} from './components/website-setup/website-setup.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'website-setup', component: WebsiteSetupComponent},
  {path:'home',component:HomeComponent},
  {path:'main',component:MainComponent},
  { path: 'main/:id', component: MainComponent },
  { path: 'pages-list/:id', loadComponent: () => import('./components/page-list/page-list.component').then(m => m.PagesListComponent) },
  { path: 'dashboard', component: DashboardComponent }
];
