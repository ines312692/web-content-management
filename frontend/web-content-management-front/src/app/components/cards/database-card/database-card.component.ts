import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTable, faEdit, faDatabase} from '@fortawesome/free-solid-svg-icons';
import {Database} from '../../../models/database.interface';
import {Router} from '@angular/router';



@Component({
  selector: 'app-database-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './database-card.component.html',
  styleUrls: ['./database-card.component.scss'],
})
export class DatabaseCardComponent {
  @Input() database!: Database;


  faTable = faTable;
  faEdit = faEdit;
  protected readonly faDatabase = faDatabase;
  constructor(private readonly router: Router) {}

  configureDatabase(): void {
    this.router.navigate(['/database-editor', this.database.id]);
  }
}
