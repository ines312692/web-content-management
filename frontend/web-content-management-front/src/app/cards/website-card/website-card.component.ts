// src/app/cards/website-card/website-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLaptop, faStore, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Website {
  id: number;
  title: string;
  url: string;
  type: 'laptop' | 'store';
}

@Component({
  selector: 'app-website-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './website-card.component.html',
  styleUrls: ['./website-card.component.scss'],
})
export class WebsiteCardComponent {
  @Input() website!: Website;
  
  faLaptop = faLaptop;
  faStore = faStore;
  faEye = faEye;
  faEdit = faEdit;
}