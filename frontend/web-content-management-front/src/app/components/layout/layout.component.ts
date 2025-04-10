import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
// @ts-ignore
import {
  DndDraggableDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndPlaceholderRefDirective,
  DropEffect
} from 'ngx-drag-drop';

import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {FirstCharPipe} from './first-char.pipe';
import {INode} from '../../models/INode';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    DndDraggableDirective,
    NgForOf,
    NgClass,
    DndPlaceholderRefDirective,
    FirstCharPipe,
    DndDropzoneDirective,
    NgIf,
    NgTemplateOutlet
  ],
  standalone: true
})
export class LayoutComponent {
  @Input() root: INode | undefined;
  @Output() dragStart = new EventEmitter<DragEvent>();
  @Output() dragMove = new EventEmitter<{ event: DragEvent, effect: DropEffect, node: INode, list?: INode[] }>();
  @Output() dragEnd = new EventEmitter<DragEvent>();
  @Output() drop = new EventEmitter<{ event: DndDropEvent, list: INode[] }>();
  @Output() remove = new EventEmitter<{ node: INode, list: INode[] }>();
  @Output() nodeSelected = new EventEmitter<{ node: INode, isRoot: boolean, list?: INode[] }>();

  onDragStart(event: DragEvent) { this.dragStart.emit(event); }

  onDragged(event: DragEvent, node: INode, list: INode[], effect: DropEffect) {
    this.dragMove.emit({ event, effect, node, list });
  }

  onDragEnd(event: DragEvent) { this.dragEnd.emit(event); }

  onDrop(event: DndDropEvent, list: INode[]) {
    this.drop.emit({ event, list });
  }

  onRemove(node: INode, list: INode[]) {
    this.remove.emit({ node, list });
  }

  onClickNode(event: MouseEvent, node: INode, isRoot: boolean, list?: INode[]) {
    this.nodeSelected.emit({ node, isRoot, list });
    event.stopPropagation();
    return false;
  }
}
