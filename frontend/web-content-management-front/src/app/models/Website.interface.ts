import {Page} from './Page.interface';

export interface Website{
  id: string;
  name: string;
  domain: string;
  type: string;
  primaryColor: string;
  description: string;
  pages: Page[];
}
