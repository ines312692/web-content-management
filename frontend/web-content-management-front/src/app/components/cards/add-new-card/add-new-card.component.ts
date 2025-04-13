import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-new-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './add-new-card.component.html',
  styleUrls: ['./add-new-card.component.scss'],
})
export class AddNewCardComponent {
  @Input() text = 'Add New';
  @Output() add = new EventEmitter<void>();

  faPlusCircle = faPlusCircle;

  onAdd() {
    this.add.emit();
  }
}
