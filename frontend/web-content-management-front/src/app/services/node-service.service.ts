import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INode } from '../models/INode';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private apiUrl = 'http://localhost:8081/api/nodes';

  constructor(private http: HttpClient) {}

  createNode(node: INode): Observable<INode> {
    return this.http.post<INode>(this.apiUrl, node);
  }

  updateNode(id: string, node: INode): Observable<INode> {
    return this.http.put<INode>(`${this.apiUrl}/${id}`, node);
  }
  getTemplatesNode(): Observable<INode[]> {
    return this.http.get<INode[]>(`${this.apiUrl}/templates`);
  }

  deleteNode(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

export class NodeServiceService {
}
