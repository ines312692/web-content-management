// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent],
  template: `<app-dashboard></app-dashboard>`,
  styles: []
})
export class AppComponent {
  title = 'webbuilder-dashboard';
}