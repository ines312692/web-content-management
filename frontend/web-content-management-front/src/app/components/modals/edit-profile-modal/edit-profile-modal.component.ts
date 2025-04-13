// src/app/modals/edit-profile-modal/edit-profile-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  isVisible = false;
  faTimes = faTimes;

  profile = {
    name: 'Amine Rachdi',
    email: 'aminerachdi@gmail.com'
  };

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  onClose() {
    this.hide();
    this.close.emit();
  }

  onSave() {
    this.save.emit(this.profile);
    this.hide();
  }
}
