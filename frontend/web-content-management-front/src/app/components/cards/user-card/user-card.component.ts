import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEdit, faTrash, faUser} from '@fortawesome/free-solid-svg-icons';
import {Project} from '../../../models/Project.interface';
import {User} from '../../../models/User.interface';

@Component({
  selector: 'app-user-card',
  imports: [
    FaIconComponent
  ],
  templateUrl: './user-card.component.html',
  standalone: true,
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() select = new EventEmitter<User>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<User>();

  protected readonly faTrash = faTrash;
  protected readonly faEdit = faEdit;
  protected readonly faUser = faUser;

  onDelete() {
    this.delete.emit(this.user.id);
  }
  onEdit() {
    this.edit.emit(this.user);
  }
}
