import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Website } from '../../../models/Website.interface';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-edit-website-modal',
  templateUrl: './edit-website-modal.component.html',
  styleUrls: ['./edit-website-modal.component.scss'],
  imports: [
    FaIconComponent,
    ReactiveFormsModule
  ],
  standalone: true
})
export class EditWebsiteModalComponent implements OnInit {
  websiteForm!: FormGroup;
  protected readonly faTimes = faTimes;

  constructor(
    private readonly dialogRef: MatDialogRef<EditWebsiteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public website: Website,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.websiteForm = this.fb.group({
      name: [this.website.name || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.website.description || '', [Validators.maxLength(500)]],
      domain: [this.website.domain || '', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      primaryColor: [this.website.primaryColor || '#000000', [Validators.required]],
    });
  }

  saveChanges(): void {
    if (this.websiteForm.valid) {
      const updatedWebsite = { ...this.website, ...this.websiteForm.value };
      this.dialogRef.close(updatedWebsite);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
