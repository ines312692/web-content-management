import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLaptop, faStore, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Website } from '../../../models/Website.interface';
import {EditWebsiteModalComponent} from '../../modals/edit-website-modal/edit-website-modal.component';

@Component({
  selector: 'app-website-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './website-card.component.html',
  styleUrls: ['./website-card.component.scss'],
})
export class WebsiteCardComponent {
  @Input() website!: Website;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Website>();



  faLaptop = faLaptop;
  faStore = faStore;
  faEye = faEye;
  faEdit = faEdit;
  protected readonly faTrash = faTrash;


  onDelete() {
    this.delete.emit(this.website.id);
  }
  onEdit() {
    this.edit.emit(this.website);
  }
}
