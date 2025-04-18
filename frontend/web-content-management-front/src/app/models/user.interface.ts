// src/app/models/user.interface.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    username: string;
    password: string;
    responsable?: User; // Optional for self-reference
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }