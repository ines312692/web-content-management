import { Component } from '@angular/core';
import { NavbarItemComponent } from '../navbar-item/navbar-item.component';
import {NavItem} from '../../models/navbar.interface';
import {NAV_ITEMS} from '../../constants/navbar.constant';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    NavbarItemComponent,
    NgForOf
  ]
})
export class HeaderComponent {
  title = 'Your Website Title';
  navItems: NavItem[] = NAV_ITEMS;
}
