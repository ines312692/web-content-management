import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { WebsiteService } from '../../services/website-service.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../models/Page.interface';

@Component({
  selector: 'app-page-list',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './page-list.component.html',
  standalone: true,
  styleUrl: './page-list.component.scss'
})
export class PagesListComponent implements OnInit {
  pages: Page[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly websiteService: WebsiteService
  ) {}

  ngOnInit() {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      const savedPages = localStorage.getItem(`pages_${websiteId}`);
      if (savedPages) {
        this.pages = JSON.parse(savedPages);
      } else {
        this.websiteService.getPagesByWebsiteId(websiteId).subscribe((pages) => {
          this.pages = pages;
          localStorage.setItem(`pages_${websiteId}`, JSON.stringify(this.pages));
        });
      }
    }
  }

  addPage() {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      const newPage = { name: `Page ${this.pages.length + 1}` };
      this.websiteService.addPageToWebsite(websiteId, newPage).subscribe((page) => {
        this.pages.push(page);
        localStorage.setItem(`pages_${websiteId}`, JSON.stringify(this.pages));
      });
    }
  }

  deletePage(page: Page) {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      this.websiteService.deletePageFromWebsite(websiteId, page.id).subscribe(() => {
        this.pages = this.pages.filter(p => p.id !== page.id);
        localStorage.setItem(`pages_${websiteId}`, JSON.stringify(this.pages));
      });
    }
  }
}

export class PageListComponent {
}
