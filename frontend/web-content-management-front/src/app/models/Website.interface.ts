import {Page} from './Page.interface';
import {Database} from './database.interface';

export interface Website{
  id: string;
  name: string;
  domain: string;
  type: string;
  primaryColor: string;
  description: string;
  pages: Page[];
  database : Database|null;
}
