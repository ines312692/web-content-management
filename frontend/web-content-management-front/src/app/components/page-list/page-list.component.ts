import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import { WebsiteService } from '../../services/website-service.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../models/Page.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PageCardComponent } from '../cards/page-card/page-card.component';
import { CreatePageModalComponent } from '../modals/create-page-modal/create-page-modal.component';
import {PageService} from '../../services/page-service.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-page-list',
  standalone: true,
  imports: [
    NgForOf,
    FaIconComponent,
    SidebarComponent,
    PageCardComponent,
    CreatePageModalComponent,
    CommonModule,
  ],
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit, OnDestroy {
  @ViewChild('createPageModal') createPageModal!: CreatePageModalComponent;
  pages: Page[] = [];
  protected readonly faPlus = faPlus;
  private readonly subscriptions: Subscription = new Subscription();


  constructor(
    private readonly route: ActivatedRoute,
    private readonly websiteService: WebsiteService,
    private readonly pageService: PageService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}


  ngOnInit() {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      this.loadPages(websiteId);

      const pagesUpdateSub = this.websiteService.getPagesUpdateListener().subscribe(() => {
        this.loadPages(websiteId);
      });
      this.subscriptions.add(pagesUpdateSub);
    }
  }

  private loadPages(websiteId: string) {
    this.websiteService.getPagesByWebsiteId(websiteId).subscribe({
      next: (pages) => {
        this.pages = pages;
        console.log('Pages loaded in parent:', this.pages);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching pages:', err)
    });
  }

  openAddPageModal() {
    this.createPageModal.show();
  }

  onCreatePageModalClose() {
    this.createPageModal.hide();
  }

  onPageCreate(page: Page) {
    const websiteId = this.route.snapshot.paramMap.get('id');
    if (websiteId) {
      this.pageService.createPage(page).subscribe({
        next: (createdPage) => {
          this.websiteService.addPageToWebsite(websiteId, createdPage).subscribe({
            next: (page) => {
              this.pages.push(page);
              localStorage.setItem(`pages_${websiteId}`, JSON.stringify(this.pages));
            },
            error: (err) => console.error('Error adding page to website:', err)
          });
        },
        error: (err) => console.error('Error creating page:', err)
      });
    }
  }

  deletePage(page: Page) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cette page ?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const websiteId = this.route.snapshot.paramMap.get('id');
        if (websiteId) {
          this.websiteService.deletePageFromWebsite(websiteId, page.id).subscribe({
            next: () => {
              this.pages = this.pages.filter(p => p.id !== page.id);
              localStorage.setItem(`pages_${websiteId}`, JSON.stringify(this.pages));
              this.snackBar.open('Page supprimée avec succès !', 'Fermer', {
                duration: 3000,
                panelClass: ['success-snackbar']
              });
            },
            error: (err) => {
              console.error('Erreur lors de la suppression de la page :', err);
              this.snackBar.open('Échec de la suppression de la page.', 'Fermer', {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
            }
          });
        }
      }
    });
  }
  editPage(page: Page) {
    console.log('Editing page:', page);

  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
