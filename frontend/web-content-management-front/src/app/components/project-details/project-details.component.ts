import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project-service.service';
import { Project } from '../../models/Project.interface';
import { NgForOf } from '@angular/common';
import { AddNewCardComponent } from '../cards/add-new-card/add-new-card.component';
import {WebsiteService} from '../../services/website-service.service';
import {ProjectWebsiteCardComponent} from '../cards/project-website-card/project-website-card.component';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CreateWebsiteModalComponent} from '../modals/create-website-modal/create-website-modal.component';
import {CreateProjectModalComponent} from '../modals/create-project-modal/create-project-modal.component'; // Import ajouté

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  standalone: true,
  styleUrls: ['./project-details.component.css'],
  imports: [
    NgForOf,
    AddNewCardComponent,
    ProjectWebsiteCardComponent,
    CreateWebsiteModalComponent,
  ]
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;
  websites: any[] = [];
  @ViewChild('createWebsiteModal') createWebsiteModal!: CreateWebsiteModalComponent;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly projectService: ProjectService,
    private readonly websiteService: WebsiteService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar // Injection ajoutée
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe((data) => {
        this.project = data;
        if (this.project.websiteIds) {
          this.loadWebsites(this.project.websiteIds);
        }
      });
    }
  }

  private loadWebsites(websiteIds: string[]): void {
    this.websites = [];
    websiteIds.forEach((id) => {
      this.websiteService.getWebsiteById(id).subscribe((website) => {
        this.websites.push(website);
        this.cdr.detectChanges();
      });
    });
  }

  onWebsiteDelete(websiteId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce site Web ?' }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.projectService.removeWebsiteFromProject(this.project.id, websiteId).subscribe({
          next: () => {
            this.websites = this.websites.filter((website) => website.id !== websiteId);
            this.snackBar.open('Site web supprimé avec succès !', 'Fermer', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du site web :', err);
            this.snackBar.open('Échec de la suppression du site web.', 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
          }
        });
      }
    });
  }

  openEditWebsiteModal(website: any): void {
    console.log('Edit website:', website);
  }

  openCreateWebsiteModal() {
    this.createWebsiteModal.show();
  }


  onWebsiteCreate(websiteData: any): void {
    this.websiteService.createWebsite(websiteData).subscribe({
      next: (createdWebsite) => {

        this.projectService.addWebsiteToProject(this.project.id, createdWebsite.id).subscribe({
          next: () => {
            this.websites.push(createdWebsite);
            this.snackBar.open('Site web créé et assigné avec succès !', 'Fermer', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
          },
          error: (err) => {
            console.error('Erreur lors de l\'assignation du site web au projet :', err);
            this.snackBar.open('Échec de l\'assignation du site web au projet.', 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la création du site web :', err);
        this.snackBar.open('Échec de la création du site web.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    });
  }

  protected readonly faPlus = faPlus;

  onCreateWebsiteModalClose() {
    console.log('Create website modal closed');
  }
}
