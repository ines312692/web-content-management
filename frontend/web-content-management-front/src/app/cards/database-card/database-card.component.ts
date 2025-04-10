import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle, faTable, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Database {
  id: number;
  title: string;
  connected: boolean;
}

@Component({
  selector: 'app-database-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './database-card.component.html',
  styleUrls: ['./database-card.component.scss'],
})
export class DatabaseCardComponent {
  @Input() database!: Database;
  
  faCircle = faCircle;
  faTable = faTable;
  faEdit = faEdit;
}