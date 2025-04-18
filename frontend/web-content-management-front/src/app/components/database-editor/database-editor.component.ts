import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database-service.service';
import { Table } from '../../models/Table.interface';
import { AddTableComponent } from './add-table/add-table.component';
import { TableListComponent } from './table-list/table-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-database-editor',
  templateUrl: './database-editor.component.html',
  standalone: true,
  imports: [
    AddTableComponent,
    TableListComponent,
    NgIf
  ],
  styleUrls: ['./database-editor.component.scss']
})
export class DatabaseEditorComponent implements OnInit {
  databaseId!: string;
  tables: Table[] = [];
  isLoading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly databaseService: DatabaseService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.databaseId = id;
      this.loadTables();
    } else {
      this.snackBar.open('Database ID is missing', 'Close', { duration: 3000 });
      console.error("Database ID is missing");
    }
  }

  loadTables(): void {
    this.isLoading = true;
    this.databaseService.getTables(this.databaseId).subscribe({
      next: (tables: Table[]) => {
        this.tables = tables;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Error loading tables', 'Close', { duration: 3000 });
        console.error("Error loading tables:", err);
      }
    });
  }

  addTable(newTable: Partial<Table>): void {
    if (newTable.name) {
      this.databaseService.addTable(this.databaseId, newTable).subscribe({
        next: () => {
          this.loadTables();
          this.snackBar.open('Table created successfully', 'Close', { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open('Error creating table', 'Close', { duration: 3000 });
          console.error("Error adding table:", err);
        }
      });
    } else {
      this.snackBar.open('Table name is required', 'Close', { duration: 3000 });
      console.error("Table name is required");
    }
  }

  editTable(table: Table): void {
    console.log("Edit table:", table);
    // Additional logic for editing table will go here
  }

  deleteTable(tableName: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to delete table "${tableName}"?` }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.databaseService.deleteTable(this.databaseId, tableName).subscribe({
          next: () => {
            this.loadTables();
            this.snackBar.open('Table deleted successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            this.snackBar.open('Error deleting table', 'Close', { duration: 3000 });
            console.error("Error deleting table:", err);
          }
        });
      }
    });
  }
}