
import { Component, Output, EventEmitter } from '@angular/core';
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
export class ProfileSectionComponent {
  faUser = faUser;

  @Output() editProfile = new EventEmitter<void>();

  onEditProfile() {
    this.editProfile.emit();
  }
}
