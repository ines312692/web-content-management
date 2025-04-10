import {INode} from './INode';

export interface ILayout {
  id: string;
  borderColor: string;
  backgroundColor: string;
  height: string;
  width: string;
  name: string;
  code: string;
  description: string;
  type: "SECTION" | "ROUTABLE";
  status: "ACTIVE" | "INACTIVE";
  nodes: INode[];
}
