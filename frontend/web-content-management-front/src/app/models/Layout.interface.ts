import {INode} from './INode';

export interface Layout {
  id: string;
  borderColor: string;
  backgroundColor: string;
  height: string;
  width: string;
  name: string;
  code: string;
  description: string;
  type: string;
  status: string;
  nodes: INode[];
}
