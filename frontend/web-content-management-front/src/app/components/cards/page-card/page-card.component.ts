import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Page } from '../../../models/Page.interface';

@Component({
  selector: 'app-page-card',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class PageCardComponent implements OnInit {
  @Input() page!: Page;
  @Output() delete = new EventEmitter<Page>();
  @Output() edit = new EventEmitter<Page>();

  protected readonly faTrash = faTrash;
  protected readonly faEdit = faEdit;

  onDelete() {
    this.delete.emit(this.page);
  }

  onEdit() {
    this.edit.emit(this.page);
  }

  ngOnInit(): void {
    console.log('PageCardComponent initialized');
    if (this.page) {
      console.log('Page received in child:', this.page);
    } else {
      console.error('No page data received in PageCardComponent');
    }
  }
  constructor() {
    console.log('PageCardComponent constructor called');
  }
}
