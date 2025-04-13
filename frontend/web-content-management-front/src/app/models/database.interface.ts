export interface Database {

  id: string;
  name: string;
  type: string;
  connectionString: string;
  description?: string;
  username: string;
  password: string;
}
