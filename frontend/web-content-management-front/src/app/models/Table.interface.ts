import {Column} from './Column.interface';

export interface Table {
  id: string;
  name: string;
  columns: Column[];
}
