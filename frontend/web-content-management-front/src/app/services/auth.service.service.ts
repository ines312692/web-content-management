import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap } from 'rxjs';
import {Router} from '@angular/router';
import {LoginCredentials} from '../models/LoginCredentials.interface';
import {AuthResponse} from '../models/AuthenResponse.interface';
import {User} from '../models/User.interface';
import {environment} from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`; // Adjust to your backend URL

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      catchError(error => {
        console.error('Full error:', error);
        if (error.status === 0) {
          throw new Error('Backend server is not responding. Is it running?');
        }
        throw error; // Re-throw other errors
      })
    );
  }
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  loginWithGoogle(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/google`).pipe(
      tap(response => {
        this.storeAuthData(response);
      })
    );
  }

  private storeAuthData(response: AuthResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('current_user', JSON.stringify(response.user));
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.router.navigate(['/login']);
  }
}
