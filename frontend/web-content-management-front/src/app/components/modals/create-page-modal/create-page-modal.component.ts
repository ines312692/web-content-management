import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Page } from '../../../models/Page.interface';

@Component({
  selector: 'app-create-page-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, MatSnackBarModule],
  templateUrl: './create-page-modal.component.html',
  styleUrls: ['./create-page-modal.component.scss']
})
export class CreatePageModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<Page>();

  isVisible = false;
  faTimes = faTimes;
  pageForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly snackBar: MatSnackBar) {
    this.pageForm = this.fb.group({
      name: ['', Validators.required]
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
    if (this.pageForm.valid) {
      const pageData: Page = {
        id: '',
        name: this.pageForm.value.name,
        layout: null

      };
      this.create.emit(pageData);
      this.pageForm.reset();
      this.hide();
    } else {
      this.snackBar.open('Veuillez remplir tous les champs requis.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
