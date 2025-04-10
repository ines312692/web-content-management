import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { DndDraggableDirective, DropEffect } from 'ngx-drag-drop';
import { NgClass, NgForOf } from '@angular/common';
import {INode} from '../../models/INode';
import {NodeService} from '../../services/node-service.service';


@Component({
  selector: 'app-origin-list',
  imports: [
    DndDraggableDirective,
    NgForOf,
    NgClass
  ],
  templateUrl: './origin-list.component.html',
  standalone: true,
  styleUrls: ['./origin-list.component.scss']
})
export class OriginListComponent implements OnInit {
  @Output() dragStart = new EventEmitter<DragEvent>();
  @Output() dragMove = new EventEmitter<{ event: DragEvent, effect: DropEffect, node: INode, list?: INode[] }>();
  @Output() dragEnd = new EventEmitter<DragEvent>();

  originList: INode[] = [];

  constructor(private nodeService: NodeService) {}

  ngOnInit(): void {
    this.nodeService.getTemplatesNode().subscribe(nodes => {
      this.originList = nodes;
      //console.log('ceci est la liste des nodes', this.originList);
    });
  }

  onDragStart(event: DragEvent) { this.dragStart.emit(event); }

  onDragged(event: DragEvent, node: INode, effect: DropEffect) {
    this.dragMove.emit({ event, effect, node });
  }

  onDragEnd(event: DragEvent) { this.dragEnd.emit(event); }

  getIconClass(type: string): string {
    switch (type) {
      case 'row': return 'fas fa-bars';
      case 'column': return 'fas fa-columns';
      case 'widget': return 'fas fa-cube';
      case 'button': return 'fas fa-hand-pointer';
      case 'text': return 'fas fa-font';
      case 'image': return 'fas fa-image';
      default: return 'fas fa-question';
    }
  }
}
