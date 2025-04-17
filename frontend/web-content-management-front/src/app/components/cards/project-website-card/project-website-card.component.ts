import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEdit, faEye, faLaptop, faStore, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-website-card',
  templateUrl: './project-website-card.component.html',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  styleUrls: ['./project-website-card.component.scss']
})
export class ProjectWebsiteCardComponent implements OnInit {
  @Input() website: any;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<any>();

  ngOnInit(): void {
    console.log('ProjectWebsiteCardComponent initialized with website:', this.website);
  }

  onDelete(): void {
    this.delete.emit(this.website.id);
  }

  onEdit(): void {
    this.edit.emit(this.website);
  }

  protected readonly faEye = faEye;
  protected readonly faTrash = faTrash;
  protected readonly faEdit = faEdit;
  protected readonly faStore = faStore;
  protected readonly faLaptop = faLaptop;
}
