import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database-service.service';
import { Table } from '../../models/Table.interface';
import { AddTableComponent } from './add-table/add-table.component';
import { TableListComponent } from './table-list/table-list.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-database-editor',
  templateUrl: './database-editor.component.html',
  standalone: true,
  imports: [
    AddTableComponent,
    TableListComponent,

  ],
  styleUrls: ['./database-editor.component.scss']
})
export class DatabaseEditorComponent implements OnInit {
  databaseId!: string;
  tables: Table[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly databaseService: DatabaseService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.databaseId = id;
      this.loadTables();
    } else {
      console.error("L'ID de la base de données est manquant.");
    }
  }

  loadTables(): void {
    this.databaseService.getTables(this.databaseId).subscribe({
      next: (tables: Table[]) => {
        this.tables = tables;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erreur lors du chargement des tables :", err);
      }
    });
  }

  addTable(newTable: Partial<Table>): void {
    if (newTable.name) {
      this.databaseService.addTable(this.databaseId, newTable).subscribe({
        next: () => this.loadTables(),
        error: (err) => console.error("Erreur lors de l'ajout de la table :", err)
      });
    } else {
      console.error("Le nom de la table est requis.");
    }
  }

  editTable(table: Table): void {
    console.log("Modifier la table :", table);
  }

  deleteTable(tableName: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message: `Êtes-vous sûr de vouloir supprimer la table "${tableName}" ?`}
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.databaseService.deleteTable(this.databaseId, tableName).subscribe({
          next: () => {
            this.loadTables();
            this.snackBar.open('Table supprimée avec succès.', 'Fermer', {duration: 3000});
          },
          error: (err) => console.error("Erreur lors de la suppression de la table :", err)
        });
      }
    });
  }
}
