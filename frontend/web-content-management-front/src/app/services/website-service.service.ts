import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Website} from '../models/Website.interface';


@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  private apiUrl = 'http://localhost:8081/websites';

  constructor(private http: HttpClient) {}

  getAllWebsites(): Observable<Website[]> {
    return this.http.get<Website[]>(this.apiUrl);
  }

  createWebsite(website: Website): Observable<Website> {
    return this.http.post<Website>(this.apiUrl, website);
  }

}

export class WebsiteServiceService {
}
