import {Component, ViewChild, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ProfileSectionComponent } from '../profile-section/profile-section.component';
import { WebsiteCardComponent } from '../cards/website-card/website-card.component';
import { DatabaseCardComponent } from '../cards/database-card/database-card.component';
import { AddNewCardComponent } from '../cards/add-new-card/add-new-card.component';
import { CreateWebsiteModalComponent } from '../modals/create-website-modal/create-website-modal.component';
import { EditProfileModalComponent } from '../modals/edit-profile-modal/edit-profile-modal.component';

import { Observable } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DashboardService } from '../../services/dashboard-service.service';
import { WebsiteService } from '../../services/website-service.service';

import { Website } from '../../models/Website.interface';
import { Database } from '../../models/database.interface';
import { CreateDatabaseModalComponent } from '../modals/create-database-modal/create-database-modal.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DatabaseService } from '../../services/database-service.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {EditWebsiteModalComponent} from '../modals/edit-website-modal/edit-website-modal.component';
import {ProjectCardComponent} from '../cards/project-card/project-card.component';
import {ProjectService} from '../../services/project-service.service';
import {CreateProjectModalComponent} from '../modals/create-project-modal/create-project-modal.component';

import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserCardComponent} from '../cards/user-card/user-card.component';
import {User} from '../../models/User.interface';
import {CreateUserModalComponent} from '../modals/create-user-modal/create-user-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    SidebarComponent,
    ProfileSectionComponent,
    WebsiteCardComponent,
    DatabaseCardComponent,
    AddNewCardComponent,
    CreateWebsiteModalComponent,
    EditProfileModalComponent,
    CreateDatabaseModalComponent,
    MatSnackBarModule,
    MatDialogModule,
    ProjectCardComponent,
    CreateProjectModalComponent,
    UserCardComponent,
    CreateUserModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  isResponsable: boolean = false;

  private readonly dashboardService = inject(DashboardService);
  private readonly websiteService = inject(WebsiteService);
  private readonly databaseService = inject(DatabaseService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly projectService=inject(ProjectService);
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  faPlus = faPlus;

  @ViewChild('createWebsiteModal') createWebsiteModal!: CreateWebsiteModalComponent;
  @ViewChild('editProfileModal') editProfileModal!: EditProfileModalComponent;
  @ViewChild('createDatabaseModal') createDatabaseModal!: CreateDatabaseModalComponent;
  @ViewChild('editWebsiteModal') editWebsiteModal!: EditWebsiteModalComponent;
  @ViewChild('createProjectModal') createProjectModal!: CreateProjectModalComponent;
  @ViewChild('createUserModal') createUserModal!: CreateUserModalComponent;


  websites$: Observable<Website[]> = this.websiteService.getWebsites();
  databases$: Observable<Database[]> = this.databaseService.getAllDatabases();
  projects$: Observable<any[]> = this.projectService.getProjects();
  users$: Observable<User[]> | undefined;


  constructor(private readonly dialog: MatDialog) {
    this.users$ = new Observable<User[]>();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.checkIfResponsible(userId);
        this.users$ = this.userService.getUsersByResponsibleId(userId);
      }
    });
  }

  openCreateWebsiteModal() {
    this.createWebsiteModal.show();
  }

  onCreateWebsiteModalClose() {
    console.log('Create website modal closed');
  }

  onWebsiteCreate(websiteData: Website) {
    this.websiteService.createWebsite(websiteData).subscribe({
      next: () => {
        this.snackBar.open('Website créé avec succès !', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.websites$ = this.websiteService.getWebsites();
      },
      error: (err) => {
        console.error('Erreur lors de la création du site web :', err);
        this.snackBar.open('Échec de la création du site web.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  openEditProfileModal() {
    this.editProfileModal.show();
  }

  onEditProfileModalClose() {
    console.log('Edit profile modal closed');
  }

  onProfileSave(profileData: any) {
    const success = this.dashboardService.updateProfile(profileData);
    if (success) {
      alert('Profile updated successfully!');
    }
  }

  openCreateDatabaseModal() {
    console.log('Opening Create Database Modal');
    this.createDatabaseModal.show();
  }

  onCreateDatabaseModalClose() {
    console.log('Create database modal closed');
  }

  onDatabaseCreate() {
    alert('Database created successfully!');
  }

  onWebsiteDelete(websiteId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce site web ?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.websiteService.deleteWebsite(websiteId).subscribe({
          next: () => {
            this.snackBar.open('Website supprimé avec succès !', 'Fermer', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.websites$ = this.websiteService.getWebsites(); // Rafraîchir la liste
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du site web :', err);
            this.snackBar.open('Échec de la suppression du site web.', 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }
  openEditWebsiteModal(website: Website): void {
    const dialogRef = this.dialog.open(EditWebsiteModalComponent, {
      width: '500px',
      data: website,
    });

    dialogRef.afterClosed().subscribe((updatedWebsite: Website | undefined) => {
      if (updatedWebsite) {
        this.onWebsiteUpdate(updatedWebsite);
      }
    });
  }
  onWebsiteUpdate(updatedWebsite: Website): void {
    this.websiteService.updateWebsite(updatedWebsite).subscribe({
      next: () => {
        this.snackBar.open('Site web mis à jour avec succès !', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.websites$ = this.websiteService.getWebsites();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du site web :', err);
        this.snackBar.open('Échec de la mise à jour du site web.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }



  onCreateProjectModalClose() {
    console.log('Create project modal closed');
  }

  onProjectCreate(projectData: any) {
    this.projectService.createProject(projectData).subscribe({
      next: () => {
        this.snackBar.open('Projet créé avec succès !', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.projects$ = this.projectService.getProjects();
      },
      error: (err) => {
        console.error('Erreur lors de la création du projet :', err);
        this.snackBar.open('Échec de la création du projet.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onProjectDelete(projectId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce projet ?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.projectService.deleteProject(projectId).subscribe({
          next: () => {
            this.snackBar.open('Projet supprimé avec succès !', 'Fermer', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.projects$ = this.projectService.getProjects();
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du projet :', err);
            this.snackBar.open('Échec de la suppression du projet.', 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  openEditProjectModal(project: any): void {
    const dialogRef = this.dialog.open(EditWebsiteModalComponent, {
      width: '500px',
      data: project,
    });

    dialogRef.afterClosed().subscribe((updatedProject: any | undefined) => {
      if (updatedProject) {
        this.onProjectUpdate(updatedProject);
      }
    });
  }

  onProjectUpdate(updatedProject: any): void {
    this.projectService.updateProject(updatedProject).subscribe({
      next: () => {
        this.snackBar.open('Projet mis à jour avec succès !', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.projects$ = this.projectService.getProjects();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du projet :', err);
        this.snackBar.open('Échec de la mise à jour du projet.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  openCreateProjectModal() {
    this.createProjectModal.show();
  }



  checkIfResponsible(userId: string): void {
    this.userService.isResponsible(userId).subscribe((isResponsible) => {
      this.isResponsable = isResponsible;
    });
  }


  openCreateUserModal() {
    this.createUserModal.show();
  }
  onCreateUserModalClose() {
    console.log('Create user modal closed');
  }


  onUserCreate($event: User) {
    const responsibleId = this.route.snapshot.paramMap.get('id'); // Récupère l'ID du responsable depuis la route
    if (!responsibleId) {
      console.error('ID du responsable introuvable');
      this.snackBar.open('Impossible de créer l\'utilisateur : ID du responsable manquant.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    const userToCreate = { ...$event, responsibleUserId: responsibleId }; // Ajoute le responsibleId

    this.userService.createUser(userToCreate).subscribe({
      next: () => {
        this.snackBar.open('Utilisateur créé avec succès !', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.users$ = this.userService.getUsersByResponsibleId(responsibleId); // Rafraîchit la liste des utilisateurs
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'utilisateur :', err);
        this.snackBar.open('Échec de la création de l\'utilisateur.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
  onUserDelete(userId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.snackBar.open('Utilisateur supprimé avec succès !', 'Fermer', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.users$ = this.userService.getUsersByResponsibleId(this.route.snapshot.paramMap.get('id')!); // Rafraîchir la liste
          },
          error: (err) => {
            console.error('Erreur lors de la suppression de l\'utilisateur :', err);
            this.snackBar.open('Échec de la suppression de l\'utilisateur.', 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }


}
