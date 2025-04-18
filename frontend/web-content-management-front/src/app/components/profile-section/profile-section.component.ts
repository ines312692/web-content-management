
import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-section',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss']
})
export class ProfileSectionComponent  implements OnInit {
  faUser = faUser;

  @Output() editProfile = new EventEmitter<void>();

  onEditProfile() {
    this.editProfile.emit();
  }

  userName: string = 'Guest';
  userEmail: string = 'guest@example.com';
  memberSince: string = 'N/A';

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const currentUser = localStorage.getItem('current_user');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userName = user.name || 'Unknown User';
      this.userEmail = user.email || 'unknown@example.com';
      this.memberSince = user.memberSince || 'N/A';
    }
  }



}
