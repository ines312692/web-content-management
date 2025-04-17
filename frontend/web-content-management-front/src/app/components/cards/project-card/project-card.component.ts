import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/Project.interface';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEdit, faEye, faLaptop, faTrash} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, FaIconComponent, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() select = new EventEmitter<Project>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Project>();

  onSelect() {
    this.select.emit(this.project);
  }

  onDelete() {
    this.delete.emit(this.project.id);
  }
  onEdit() {
    this.edit.emit(this.project);
  }

  protected readonly faLaptop = faLaptop;
  protected readonly faEye = faEye;
  protected readonly faTrash = faTrash;
  protected readonly faEdit = faEdit;
}
