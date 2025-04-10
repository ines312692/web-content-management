// src/app/dashboard/dashboard.component.ts
import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { ProfileSectionComponent } from '../profile-section/profile-section.component';
import { WebsiteCardComponent } from '../cards/website-card/website-card.component';
import { DatabaseCardComponent } from '../cards/database-card/database-card.component';
import { AddNewCardComponent } from '../cards/add-new-card/add-new-card.component';
import { CreateWebsiteModalComponent } from '../modals/create-website-modal/create-website-modal.component';
import { EditProfileModalComponent } from '../modals/edit-profile-modal/edit-profile-modal.component';
import { DashboardService } from '../services/dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    SidebarComponent,
    ProfileSectionComponent,
    WebsiteCardComponent,
    DatabaseCardComponent,
    AddNewCardComponent,
    CreateWebsiteModalComponent,
    EditProfileModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private dashboardService = inject(DashboardService);
  faPlus = faPlus;

  @ViewChild('createWebsiteModal') createWebsiteModal!: CreateWebsiteModalComponent;
  @ViewChild('editProfileModal') editProfileModal!: EditProfileModalComponent;

  websites$: Observable<any[]> = this.dashboardService.websites$;
  databases$: Observable<any[]> = this.dashboardService.databases$;

  openCreateWebsiteModal() {
    this.createWebsiteModal.show();
  }

  onCreateWebsiteModalClose() {
    console.log('Create website modal closed');
  }

  onWebsiteCreate(websiteData: any) {
    const newWebsite = this.dashboardService.addWebsite(websiteData);
    alert('Website created successfully!');
  }

  openEditProfileModal() {
    this.editProfileModal.show();
  }

  onEditProfileModalClose() {
    console.log('Edit profile modal closed');
  }

  onProfileSave(profileData: any) {
    const success = this.dashboardService.updateProfile(profileData);
    if (success) {
      alert('Profile updated successfully!');
    }
  }

  addNewDatabase() {
    alert('Database creation form will open here');
  }
}
