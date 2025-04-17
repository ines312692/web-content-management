import {ILayout} from './ILayout';

export interface Page {
  id: string;
  name: string;
  layout: ILayout | null;
}
