import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {AuthService} from '../../services/auth.service.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  loginError = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Form invalid');
      return;
    }

    this.isLoading = true;
    this.loginError = '';
    console.log('Sending login request...', this.loginForm.value);

    const credentials = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful');
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('current_user', JSON.stringify(response.user));
        this.isLoading = false;

        const userId = response.user.id;
        this.router.navigate([`/dashboard/${userId}`]).then(r => console.log('Redirected to dashboard'));
      },
      error: (error) => {
        console.error('Login error:', error);
        this.isLoading = false;
        this.loginError = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  handleGoogleSignIn() {
    this.isLoading = true;
    this.loginError = '';

    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard/']).then(r => console.log('Redirected to dashboard'));
      },
      error: (error) => {
        this.isLoading = false;
        this.loginError = error.error?.message || 'Google login failed. Please try again.';
      }
    });
  }
}
