import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-database-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './create-database-modal.component.html',
  styleUrls: ['./create-database-modal.component.scss']
})
export class CreateDatabaseModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  isVisible = false;
  faTimes = faTimes;

  database = {
    name: '',
    type: 'SQL',
    connectionString: '',
    description: '',
    username: '',
    password: ''
  };

  show() {
    console.log('Showing Create Database Modal');
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
    this.create.emit(this.database);
    this.hide();

    this.database = {
      name: '',
      type: 'SQL',
      connectionString: '',
      description: '',
      username: '',
      password: ''
    };
  }
}
