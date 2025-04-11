import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  // Replace with your actual API URL
  private apiUrl = 'https://your-backend-api.com/auth';
  
  constructor(private http: HttpClient) {}
  
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.isAuthenticatedSubject.next(true);
        })
      );
  }
  
  loginWithGoogle(): Observable<AuthResponse> {
    // This would typically redirect to Google OAuth
    // For this example, we'll just simulate a call to a backend endpoint
    return this.http.get<AuthResponse>(`${this.apiUrl}/google-login`)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.isAuthenticatedSubject.next(true);
        })
      );
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}