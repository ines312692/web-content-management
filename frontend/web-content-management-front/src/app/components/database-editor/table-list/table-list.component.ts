import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForOf, NgIf } from '@angular/common';
import { Table } from '../../../models/Table.interface';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faDatabase, faEdit, faEye, faSearch, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',  
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FaIconComponent
  ],
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnChanges {
  @Input() tables: Table[] = [];
  @Output() onEdit = new EventEmitter<Table>();
  @Output() onDelete = new EventEmitter<string>();
  
  constructor(private dialog: MatDialog) {}

  ngOnChanges(): void {
    if (this.tables && this.tables.length > 0) {
      console.log(`Loaded ${this.tables.length} tables`);
    } else {
      console.log("No tables received or incomplete data");
    }
  }

  editTable(table: Table): void {
    this.onEdit.emit(table);
  }

  // confirmDelete(tableName: string): void {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     data: { message: `Are you sure you want to delete table "${tableName}"?` }
  //   });

  //   dialogRef.afterClosed().subscribe((confirmed: boolean) => {
  //     if (confirmed) {
  //       this.deleteTable(tableName);
  //     }
  //   });
  // }

  deleteTable(tableName: string): void {
    this.onDelete.emit(tableName);
  }

  protected readonly faSearch = faSearch;
  protected readonly faEye = faEye;
  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;
  protected readonly faDatabase = faDatabase;
}
