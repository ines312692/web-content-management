import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Website} from '../models/Website.interface';


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  private readonly apiUrl = 'http://localhost:8081/api/websites';

  constructor(private readonly http: HttpClient) {
  }


  createWebsite(website: Website): Observable<Website> {
    return this.http.post<Website>(this.apiUrl, website);
  }

  getPagesByWebsiteId(websiteId: string) {
    const url = `http://localhost:8081/api/websites/${websiteId}/pages`;
    return this.http.get<any[]>(url).pipe(
      tap((pages) => console.log('Received pages:', pages)),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof SyntaxError) {
          console.error('Invalid JSON response:', error.error);
        } else {
          console.error('Error fetching pages:', error);
        }
        return throwError(() => new Error('Erreur lors de la récupération des pages.'));
      })
    );
  }

  addPageToWebsite(websiteId: string, page: any) {
    return this.http.post<any>(`/api/websites/${websiteId}/pages`, page);
  }

  deletePageFromWebsite(websiteId: string, id: string) {
    return this.http.delete(`/api/websites/${websiteId}/pages/${id}`);
  }

  getWebsites(): Observable<Website[]> {
    return this.http.get<Website[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching websites:', error);
        return throwError(() => new Error('Erreur lors de la récupération des sites web.'));
      })
    );
  }

  deleteWebsite(websiteId: string) {
    return this.http.delete(`${this.apiUrl}/${websiteId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting website:', error);
        return throwError(() => new Error('Erreur lors de la suppression du site web.'));
      })
    );

  }

  updateWebsite(updatedWebsite: Website) {
    const url = `${this.apiUrl}/${updatedWebsite.id}`;
    return this.http.put<Website>(url, updatedWebsite).pipe(
      tap((response) => console.log('Website updated:', response)),
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating website:', error);
        return throwError(() => new Error('Erreur lors de la mise à jour du site web.'));
      })
    );
  }
}

