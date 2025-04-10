import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WebsiteService } from '../../services/website-service.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-website-setup-component',
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './website-setup-component.component.html',
  standalone: true,
  styleUrl: './website-setup-component.component.scss'
})
export class WebsiteSetupComponentComponent {
  setupForm: FormGroup;

  @Output() setupSubmitted = new EventEmitter<any>();

  constructor(private readonly fb: FormBuilder, private readonly websiteService: WebsiteService,private readonly snackBar: MatSnackBar) {
    this.setupForm = this.fb.group({
      name: ['', Validators.required],
      domain: ['', Validators.required],
      type: ['', Validators.required],
      primaryColor: ['#000000', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.setupForm.valid) {
      const newWebsite = this.setupForm.value;
      this.websiteService.createWebsite(newWebsite).subscribe({
        next: (response) => {
          this.snackBar.open('Website créé avec succès !', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.setupSubmitted.emit(response);
        },
        error: () => {
          this.snackBar.open('Erreur lors de la création du site web.', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
