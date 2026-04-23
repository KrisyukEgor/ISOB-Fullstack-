export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface AccessTokenResponse {
  access: string;
}