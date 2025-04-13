import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../models/Table.interface';
import { Column } from '../models/Column.interface';
import {Database} from '../models/database.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly apiUrl = 'http://localhost:8081/databases';

  constructor(private readonly http: HttpClient) {}

  getAllDatabases(): Observable<Database[]> {
    return this.http.get<Database[]>(this.apiUrl);
  }

  getDatabaseById(id: string): Observable<Database> {
    return this.http.get<Database>(`${this.apiUrl}/${id}`);
  }

  createDatabase(database: Database): Observable<Database> {
    return this.http.post<Database>(this.apiUrl, database);
  }

  updateDatabase(id: string, database: Database): Observable<Database> {
    return this.http.put<Database>(`${this.apiUrl}/${id}`, database);
  }

  deleteDatabase(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTables(databaseId: string): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/${databaseId}/tables`);
  }

  addTable(databaseId: string, table: Partial<Table>): Observable<void> {
    return this.http.post<void>(`http://localhost:8081/databases/${databaseId}/tables`, { tableName: table.name });
  }

  addColumn(databaseId: string, tableId: string, newColumn: Partial<Column>): Observable<Column> {
    return this.http.post<Column>(`${this.apiUrl}/${databaseId}/tables/${tableId}/columns`, newColumn);
  }
  deleteTable(databaseId: string, tableName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${databaseId}/tables/${tableName}`);
  }
}
