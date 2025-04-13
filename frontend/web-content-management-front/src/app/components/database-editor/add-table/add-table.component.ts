import { Component, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent {
  newTable = { name: '' };
  @Output() onAdd = new EventEmitter<any>();

  addTable() {
    if (this.newTable.name.trim()) {
      this.onAdd.emit(this.newTable);
      this.newTable = { name: '' };
    }
  }
}
