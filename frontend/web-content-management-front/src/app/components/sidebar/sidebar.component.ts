
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome, faGlobe, faDatabase, faFolder, faCog, faUser, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
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

  userName: string = 'Guest';
  userRole: string = 'User';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    const currentUser = localStorage.getItem('current_user');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userName = user.name || 'Unknown User';
      this.userRole = user.role || 'User';
    }
  }

  protected readonly faSignOutAlt = faSignOutAlt;

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(r => console.log('Redirected to login'));
  }

}
