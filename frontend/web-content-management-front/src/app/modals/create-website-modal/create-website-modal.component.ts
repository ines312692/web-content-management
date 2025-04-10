// src/app/modals/create-website-modal/create-website-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-website-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './create-website-modal.component.html', 
  styleUrls: ['./create-website-modal.component.scss']
})
export class CreateWebsiteModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();
  
  isVisible = false;
  faTimes = faTimes;
  
  website = {
    name: '',
    url: '',
    template: 'blank'
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
  
  onCreate() {
    this.create.emit(this.website);
    this.hide();
    
    // Reset form
    this.website = {
      name: '',
      url: '',
      template: 'blank'
    };
  }
}