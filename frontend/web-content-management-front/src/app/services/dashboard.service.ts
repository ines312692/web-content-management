// src/app/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private websitesSubject = new BehaviorSubject<any[]>([
    { id: 1, title: 'Personal Blog', url: 'blog.example.com', type: 'laptop' },
    { id: 2, title: 'Online Shop', url: 'shop.example.com', type: 'store' }
  ]);
  
  private databasesSubject = new BehaviorSubject<any[]>([
    { id: 1, title: 'Blog Database', connected: true },
    { id: 2, title: 'Products Database', connected: true }
  ]);
  
  websites$ = this.websitesSubject.asObservable();
  databases$ = this.databasesSubject.asObservable();
  
  constructor() { }
  
  getWebsites() {
    return this.websitesSubject.value;
  }
  
  getDatabases() {
    return this.databasesSubject.value;
  }
  
  addWebsite(website: any) {
    const currentWebsites = this.websitesSubject.value;
    const newId = currentWebsites.length + 1;
    const newWebsite = {
      id: newId,
      title: website.name,
      url: website.url,
      type: 'laptop'
    };
    
    this.websitesSubject.next([...currentWebsites, newWebsite]);
    return newWebsite;
  }
  
  updateProfile(profileData: any) {
    console.log('Profile updated:', profileData);
    return true;
  }
}