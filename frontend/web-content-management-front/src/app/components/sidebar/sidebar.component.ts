
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome, faGlobe, faDatabase, faFolder, faCog, faUser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  faHome = faHome;
  faGlobe = faGlobe;
  faDatabase = faDatabase;
  faFolder = faFolder;
  faCog = faCog;
  faUser = faUser;

  activeMenuItem = 'dashboard';

  setActiveMenuItem(item: string) {
    this.activeMenuItem = item;
  }
}
