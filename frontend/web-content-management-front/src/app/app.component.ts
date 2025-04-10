import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    DashboardComponent
  ],
  template: `<app-header></app-header><app-dashboard></app-dashboard>`,
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'website-builder';
}

