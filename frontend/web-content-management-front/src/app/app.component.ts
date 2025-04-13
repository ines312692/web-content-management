import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
  ],
  standalone: true
})
export class AppComponent {
  title = 'website-builder';
}