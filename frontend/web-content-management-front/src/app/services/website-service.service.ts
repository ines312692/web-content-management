import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, Subject, tap, throwError} from 'rxjs';
import {Website} from '../models/Website.interface';


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  private readonly apiUrl = 'http://localhost:8081/api/websites';
  private readonly pagesUpdated = new Subject<void>();

  constructor(private readonly http: HttpClient) {
  }


  createWebsite(website: Website): Observable<Website> {
    return this.http.post<Website>(this.apiUrl, website);
  }

  getPagesByWebsiteId(websiteId: string | null): Observable<any[]> {
    const url = `${this.apiUrl}/${websiteId}/pages`;
    return this.http.get<any[]>(url).pipe(
      tap((pages) => console.log('Received pages:', pages)),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching pages:', error);
        return throwError(() => new Error('Erreur lors de la récupération des pages.'));
      })
    );
  }

  addPageToWebsite(websiteId: string, page: any): Observable<any> {
    const url = `${this.apiUrl}/${websiteId}/pages`;
    return this.http.post<any>(url, page).pipe(
      tap(() => this.pagesUpdated.next())
    );
  }

  deletePageFromWebsite(websiteId: string, id: string): Observable<string> {
    const url = `${this.apiUrl}/${websiteId}/pages/${id}`;
    return this.http.delete(url, { responseType: 'text' }).pipe(
      tap(() => this.pagesUpdated.next())
    );
  }

  getPagesUpdateListener(): Observable<void> {
    return this.pagesUpdated.asObservable();
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
  getWebsiteById(websiteId: string): Observable<Website> {
    const url = `${this.apiUrl}/${websiteId}`;
    return this.http.get<Website>(url).pipe(
      tap((response) => console.log('Website fetched:', response)),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching website:', error);
        return throwError(() => new Error('Erreur lors de la récupération du site web.'));
      })
    );
  }
}

export class WebsiteServiceService {
}
