import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';

import {Router, RouterLink} from '@angular/router';
import { UserService } from '../../services/user.service';
import {AuthService} from '../../services/auth.service.service';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  viewProviders: [FormBuilder],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    NgOptimizedImage,
    RouterLink
  ],
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  availableUsers: any[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      responsableId: ['']
    });

    this.loadAvailableUsers();
  }

  loadAvailableUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.availableUsers = users,
      error: (error) => console.error('Error loading users:', error)
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
