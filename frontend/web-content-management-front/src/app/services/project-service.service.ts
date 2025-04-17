import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/Project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly baseUrl = 'http://localhost:8081/projects';

  constructor(private readonly http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${projectId}`);
  }
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project);
  }

  deleteProject(projectId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${projectId}`);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/${project.id}`, project);
  }

  removeWebsiteFromProject(projectId: string, websiteId: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${projectId}/remove-website/${websiteId}`, {});
  }

  addWebsiteToProject(projectId: string, websiteId: string) {
    return this.http.patch<void>(`${this.baseUrl}/${projectId}/add-website/${websiteId}`, {});
  }
}
