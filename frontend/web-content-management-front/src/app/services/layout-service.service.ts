import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILayout } from '../models/ILayout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private readonly apiUrl = 'http://localhost:8081/layouts';

  constructor(private readonly http: HttpClient) {}

  createLayout(layout: ILayout): Observable<ILayout> {
    return this.http.post<ILayout>(this.apiUrl, layout);
  }
  getLayoutById(id: string): Observable<ILayout> {
    return this.http.get<ILayout>(`${this.apiUrl}/${id}`);
  }
  updateLayout(id: string, layout: ILayout): Observable<ILayout> {
    return this.http.put<ILayout>(`${this.apiUrl}/${id}`, layout);
  }
}

export class LayoutServiceService {
}
