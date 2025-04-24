import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DndDropEvent, DndModule} from 'ngx-drag-drop';
import {FormsModule} from '@angular/forms';

import {Table} from '../../models/Table.interface';

@Component({
  selector: 'app-database-content',
  standalone: true,
  imports: [CommonModule, DndModule, FormsModule],
  templateUrl: './database-content.component.html',
  styleUrls:['database-content.component.scss']
})
export class DatabaseContentComponent implements OnInit {
  @Input() tables: Table[] = [];
  @Input() isPreviewMode: boolean = false;
  @Output() dragStart = new EventEmitter<void>();
  @Output() dragEnd = new EventEmitter<void>();
  @Output() drop = new EventEmitter<{ event: DndDropEvent, list?: Table[] }>();

  constructor() {}

  ngOnInit(): void { /* TODO document why this method 'ngOnInit' is empty */ }

  onDragStart(): void {
    this.dragStart.emit();
  }

  onDragEnd(): void {
    this.dragEnd.emit();
  }
}


