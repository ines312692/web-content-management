import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'website-builder';
}