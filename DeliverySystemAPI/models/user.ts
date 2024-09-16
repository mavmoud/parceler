export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  refreshToken?: string;
}

export const users: User[] = [];
