import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { NodeDetailsComponent } from '../node-details/node-details.component';
import { LayoutDetailsComponent } from '../layout-details/layout-details.component';
import {INode} from '../../models/INode';
import {ILayout} from '../../models/ILayout';
import {NodeService} from '../../services/node-service.service';
import {LayoutService} from '../../services/layout-service.service';


@Component({
  selector: 'app-options',
  imports: [
    JsonPipe,
    NodeDetailsComponent,
    LayoutDetailsComponent
  ],
  templateUrl: './options.component.html',
  standalone: true,
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  @Input() selectedNode$: Observable<INode> | undefined;
  @Input() root: INode | undefined;
  @Input() layout$: Observable<ILayout> | undefined;
  @Input() selectedNodeIsRoot = false;
  @Output() saveNode = new EventEmitter<{ oldNode: INode, newNode: INode, isRoot: boolean }>();
  @Output() saveLayout = new EventEmitter<ILayout>();

  constructor(private nodeService: NodeService, private layoutService: LayoutService) {}

  ngOnInit(): void {
    if (this.layout$) {
      this.layout$.subscribe(layout => {
        //console.log('Layout reçu dans OptionsComponent :', layout);
      });
    }

    if (this.selectedNode$) {
      this.selectedNode$.subscribe(node => {
       // console.log('Node sélectionné reçu dans OptionsComponent :', node);
      });
    }
  }


}
