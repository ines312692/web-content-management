import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome, faGlobe, faDatabase, faFolder, faCog, faUser, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators';

interface MenuItem {
  id: string;
  icon: any;
  label: string;
  route: string;
}

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
  faSignOutAlt = faSignOutAlt;

  activeMenuItem = 'dashboard';
  
  menuItems: MenuItem[] = [
    { id: 'dashboard', icon: this.faHome, label: 'Dashboard', route: '/dashboard' },
    { id: 'projects', icon: this.faFolder, label: 'Projects', route: '/components' },
    { id: 'websites', icon: this.faGlobe, label: 'My Websites', route: '/websites' },
    { id: 'databases', icon: this.faDatabase, label: 'My Databases', route: '/databases' },
    { id: 'settings', icon: this.faCog, label: 'Settings', route: '/settings' }
  ];

  userName: string = 'Guest';
  userRole: string = 'User';
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.loadUserInfo();
    this.setActiveFromCurrentRoute();
    
    // Subscribe to router events to update active item when route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveFromCurrentRoute();
    });
  }

  setActiveFromCurrentRoute(): void {
    const currentUrl = this.router.url;
    // Find menu item that matches the current route
    const matchingItem = this.menuItems.find(item => 
      currentUrl.startsWith(item.route)
    );
    
    if (matchingItem) {
      this.activeMenuItem = matchingItem.id;
    }
  }

  navigateTo(item: MenuItem): void {
    this.activeMenuItem = item.id;
    this.router.navigate([item.route]);
  }

  loadUserInfo(): void {
    const currentUser = localStorage.getItem('current_user');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userName = user.name || 'Unknown User';
      this.userRole = user.role || 'User';
    }
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}