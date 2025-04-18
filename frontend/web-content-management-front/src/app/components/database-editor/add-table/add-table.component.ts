import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent {
  newTable = { name: '' };
  submitted = false;
  
  @Output() onAdd = new EventEmitter<any>();

  addTable() {
    this.submitted = true;
    
    if (this.newTable.name.trim()) {
      this.onAdd.emit(this.newTable);
      this.resetForm();
    }
  }
  
  resetForm() {
    this.newTable = { name: '' };
    this.submitted = false;
  }
}