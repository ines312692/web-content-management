import { Component, Input, Output, EventEmitter } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./navbar-item.component.scss']
})
export class NavbarItemComponent {
  @Input() navItemLabel = '';
  @Input() link = '';
  @Output() itemClicked = new EventEmitter<void>();

  onClick() {
    this.itemClicked.emit();
  }
}
