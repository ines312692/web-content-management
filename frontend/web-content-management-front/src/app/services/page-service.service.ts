import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/Page.interface';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private apiUrl = 'http://localhost:8081/api/pages';

  constructor(private http: HttpClient) {}

  getAllPages(): Observable<Page[]> {
    return this.http.get<Page[]>(this.apiUrl);
  }

  createPage(page: Page): Observable<Page> {
    return this.http.post<Page>(this.apiUrl, page);
  }

}

export class PageServiceService {
}
