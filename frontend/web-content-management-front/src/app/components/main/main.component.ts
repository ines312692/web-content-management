import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import {Observable, Subject, BehaviorSubject, throwError, catchError, tap} from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { OriginListComponent } from '../origin-list/origin-list.component';
import { LayoutComponent } from '../layout/layout.component';
import { OptionsComponent } from '../options/options.component';

import {INode} from '../../models/INode';
import {ILayout} from '../../models/ILayout';
import {LayoutService} from '../../services/layout-service.service';
import {NodeService} from '../../services/node-service.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [OriginListComponent, LayoutComponent, OptionsComponent, RouterModule],
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly _selectedNode = new Subject<INode>();
  private readonly _layoutSubject = new BehaviorSubject<ILayout | null>(null);
  private selectedList: INode[] | undefined = undefined;
  private lastSelectedNode: INode | null = null;

  // History tracking for undo/redo functionality
  private historyStack: INode[] = [];
  private historyPosition = -1;
  private maxHistorySize = 30; // Limit the history size to prevent memory issues

  selectedNode$ = this._selectedNode.asObservable();
  layout$ = this._layoutSubject.asObservable().pipe(filter(layout => layout !== null));
  isLastSelectedNodeRoot = false;
  
  // Flags to disable undo/redo buttons when appropriate
  canUndo = false;
  canRedo = false;

  // Create a BehaviorSubject to trigger updates when root changes
  private _rootSubject = new BehaviorSubject<INode | null>(null);
  
  // Expose the root as a property with a getter/setter to ensure UI updates
  private _root: INode = {
    id: '',
    name: "Layout",
    type: "row",
    selected: false,
    children: [],
    template: false,
  };
  
  get root(): INode {
    return this._root;
  }
  
  set root(value: INode) {
    this._root = value;
    this._rootSubject.next(value);
  }

  constructor(
    private readonly layoutService: LayoutService,
    private readonly route: ActivatedRoute,
    private readonly nodeService: NodeService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeLayout();
  }

  ngOnDestroy(): void {
    this._selectedNode.complete();
    this._rootSubject.complete();
  }

  private initializeLayout(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.route.paramMap.pipe(
        switchMap(params => {
          const layoutId = params.get('id');
          return layoutId ? this.layoutService.getLayoutById(layoutId) : new Observable<ILayout>();
        }),
        tap(layout => {
          this.root = layout?.nodes?.[0] || this.createDefaultLayout(id);
          this._layoutSubject.next(layout);
          
          // Add initial state to history
          this.addToHistory(this.deepClone(this.root));
        }),
        catchError(error => {
          console.error(error);
          return throwError(() => error);
        })
      ).subscribe();
    } else {
      console.error('No layout ID provided');
    }
  }

  // Deep clone helper to ensure immutability in history tracking
  private deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  // Add current state to history
  private addToHistory(state: INode): void {
    // If we've undone some changes and then make a new change,
    // discard the "future" states
    if (this.historyPosition < this.historyStack.length - 1) {
      this.historyStack = this.historyStack.slice(0, this.historyPosition + 1);
    }
    
    // Add new state to history
    this.historyStack.push(state);
    
    // Maintain maximum history size
    if (this.historyStack.length > this.maxHistorySize) {
      this.historyStack.shift();
    } else {
      this.historyPosition++;
    }
    
    // Update button states
    this.updateHistoryButtonStates();
  }

  // Update the undo/redo button states
  private updateHistoryButtonStates(): void {
    this.canUndo = this.historyPosition > 0;
    this.canRedo = this.historyPosition < this.historyStack.length - 1;
    // Force change detection to update the UI
    this.changeDetector.detectChanges();
  }

  // Undo the last change
  undo(): void {
    if (!this.canUndo) return;
    
    this.historyPosition--;
    // Create a new object reference to ensure Angular detects the change
    this.root = this.deepClone(this.historyStack[this.historyPosition]);
    this.clearSelection();
    this.updateHistoryButtonStates();
    
    // Update the layout in the backend
    this.updateLayout(false);
    
    // Force change detection
    this.changeDetector.detectChanges();
  }

  // Redo a previously undone change
  redo(): void {
    if (!this.canRedo) return;
    
    this.historyPosition++;
    // Create a new object reference to ensure Angular detects the change
    this.root = this.deepClone(this.historyStack[this.historyPosition]);
    this.clearSelection();
    this.updateHistoryButtonStates();
    
    // Update the layout in the backend
    this.updateLayout(false);
    
    // Force change detection
    this.changeDetector.detectChanges();
  }

  // Public method to save current layout that can be called from the template
  saveCurrentLayout(): void {
    this.updateLayout(true);
  }

  private createDefaultLayout(id: string): INode {
    return {
      id,
      name: "Default Layout",
      type: "row",
      selected: false,
      children: [],
      template: false,
    };
  }

  onDragStart(): void {}

  onDragged(payload: { event: DragEvent, effect: DropEffect, node: INode, list?: INode[] }): void {
    if (payload.effect === 'move' && payload.list) {
      const index = this.findNodeIndexInList(payload.node, payload.list);
      if (index >= 0) payload.list.splice(index, 1);
    }
  }

  onDragEnd(): void {}

  onDrop(payload: { event: DndDropEvent, list?: INode[] }): void {
    if (payload.list && (payload.event.dropEffect === 'copy' || payload.event.dropEffect === 'move')) {
      // Save current state before modification
      const previousState = this.deepClone(this.root);
      
      const index = payload.event.index ?? payload.list.length;
      const newNode = { ...payload.event.data, id: this.generateUniqueId(), template: false };
      const parentNode = payload.list.find(node => node.id === payload.event.data.parent?.id);

      if (parentNode) {
        parentNode.children.splice(index, 0, newNode);
        this.updateNode(parentNode);
      } else {
        payload.list.splice(index, 0, newNode);
      }

      this.clearSelection();
      this.onNodeSelected({ node: newNode, isRoot: false, list: payload.list });
      this.updateLayout();
      
      // Add new state to history
      this.addToHistory(this.deepClone(this.root));
      
      // Force change detection
      this.changeDetector.detectChanges();
    }
  }

  private updateNode(node: INode): void {
    this.nodeService.updateNode(node.id, node).pipe(
      tap(response => console.log('Nœud parent mis à jour avec succès', response)),
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  private updateLayout(addToHistory: boolean = true): void {
    const updatedLayout: ILayout = {
      id: this.root.id,
      name: this.root.name,
      type: "SECTION",
      description: this.root.description ?? '',
      nodes: this.root.children,
      borderColor: this.root.borderColor ?? '',
      backgroundColor: this.root.backgroundColor ?? '',
      height: this.root.height ?? '',
      width: this.root.width ?? '',
      code: 'someCode',
      status: 'ACTIVE'
    };

    this.updateNodes(updatedLayout.nodes);
    this.layoutService.updateLayout(updatedLayout.id, updatedLayout).pipe(
      tap(response => {
        console.log('Layout mis à jour avec succès', response);
        // Update the layout subject to notify components
        this._layoutSubject.next(updatedLayout);
      }),
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      })
    ).subscribe();
    
    // Add to history if needed
    if (addToHistory) {
      this.addToHistory(this.deepClone(this.root));
    }
  }

  private updateNodes(nodes: INode[]): void {
    nodes.forEach(node => {
      if (!node.template) {
        this.nodeService.updateNode(node.id, node).pipe(
          tap(response => {
            if (response) {
              console.log('Nœud mis à jour avec succès', response);
            } else {
              this.createNode(node);
            }
          }),
          catchError(error => {
            console.error(error);
            return throwError(() => error);
          })
        ).subscribe();

        if (node.children?.length) {
          this.updateNodes(node.children);
        }
      }
    });
  }

  private createNode(node: INode): void {
    this.nodeService.createNode(node).pipe(
      tap(response => console.log('Nœud créé avec succès', response)),
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  onRemove(payload: { node: INode, list: INode[] }): void {
    // Save current state before modification
    const previousState = this.deepClone(this.root);
    
    const index = this.findNodeIndexInList(payload.node, payload.list);
    if (index >= 0) {
      this.nodeService.deleteNode(payload.node.id).pipe(
        tap(() => {
          console.log('Nœud supprimé avec succès');
          payload.list.splice(index, 1);
          this.clearSelection();
          this.updateLayout();
          
          // Add new state to history
          this.addToHistory(this.deepClone(this.root));
          
          // Force change detection
          this.changeDetector.detectChanges();
        }),
        catchError(error => {
          console.error(error);
          return throwError(() => error);
        })
      ).subscribe();
    }
  }

  onNodeSelected(payload: { node: INode, isRoot: boolean, list?: INode[] }): void {
    if (this.lastSelectedNode) this.lastSelectedNode.selected = false;
    payload.node.selected = true;
    this.lastSelectedNode = payload.node;
    this._selectedNode.next(payload.node);
    this.isLastSelectedNodeRoot = payload.isRoot;
    this.selectedList = payload.list;
    
    // Force change detection
    this.changeDetector.detectChanges();
  }

  onNodeSave(payload: { oldNode: INode, newNode: INode, isRoot: boolean }): void {
    // Save current state before modification
    const previousState = this.deepClone(this.root);
    
    if (payload.isRoot) {
      this.root = payload.newNode;
    } else {
      const index = this.findNodeIndexInList(payload.oldNode, this.selectedList);
      if (index >= 0 && this.selectedList) {
        this.selectedList[index] = payload.newNode;
      }
    }
    this.onNodeSelected({ node: payload.newNode, isRoot: payload.isRoot, list: this.selectedList });

    this.nodeService.updateNode(payload.newNode.id, payload.newNode).pipe(
      tap(response => {
        console.log('Nœud mis à jour avec succès', response);
        this.updateLayout();
        
        // Add new state to history
        this.addToHistory(this.deepClone(this.root));
        
        // Force change detection
        this.changeDetector.detectChanges();
      }),
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      })
    ).subscribe();
  }
  
  private findNodeIndexInList(node: INode, list: INode[] | undefined): number {
    return list ? list.indexOf(node) : -1;
  }

  private clearSelection(): void {
    this.lastSelectedNode = null;
    this.selectedList = undefined;
    this._selectedNode.next(null as any);
    this.unselectAllFromTree(this.root);
  }

  private unselectAllFromTree(tree: INode): void {
    tree.selected = false;
    tree.children.forEach(child => this.unselectAllFromTree(child));
  }

  onSaveLayout(newLayout: ILayout): void {
    // Save current state before modification
    const previousState = this.deepClone(this.root);
    
    this.layoutService.updateLayout(newLayout.id, newLayout).pipe(
      tap(() => {
        // Add new state to history
        this.addToHistory(this.deepClone(this.root));
        
        // Force change detection
        this.changeDetector.detectChanges();
      })
    ).subscribe();
  }

  // Clear functionality
  clearLayout(): void {
    if (confirm('Are you sure you want to clear the layout? This action cannot be undone.')) {
      // Save current state before clearing
      const previousState = this.deepClone(this.root);
      
      // Create a new root object to ensure change detection
      const newRoot = this.deepClone(this.root);
      newRoot.children = [];
      this.root = newRoot;
      
      this.clearSelection();
      this.updateLayout();
      
      // Add new empty state to history
      this.addToHistory(this.deepClone(this.root));
      
      // Force change detection
      this.changeDetector.detectChanges();
    }
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 11);
  }
}