import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../../../models/User.interface';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-user-modal',
  imports: [
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-user-modal.component.html',
  standalone: true,
  styleUrl: './create-user-modal.component.scss'
})
export class CreateUserModalComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<User>();

  userForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }



  onSubmit(): void {
    if (this.userForm.valid) {
      this.create.emit(this.userForm.value);
      this.onClose();
    }
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

  protected readonly faTimes = faTimes;
}
