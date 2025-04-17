import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Project } from '../../../models/Project.interface';

@Component({
  selector: 'app-create-project-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSnackBarModule
  ],
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss']
})
export class CreateProjectModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<Project>();

  isVisible = false;
  faTimes = faTimes;
  projectForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      websiteIds: [[]]
    });
  }

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  onClose() {
    this.hide();
    this.close.emit();
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const projectData: Project = {
        ...this.projectForm.value,

      };

      this.create.emit(projectData);
      this.projectForm.reset({
        websiteIds: []
      });
      this.hide();
    } else {
      this.snackBar.open('Veuillez remplir tous les champs requis.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
