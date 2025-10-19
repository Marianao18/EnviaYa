export interface User {
  id?: string;
  name: string;
  lastname?: string;
  email: string;
  password: string;
  isVerified?: boolean;    // debe coincidir con lo que usas en la App
  loginAttempts?: number;
  lockedUntil?: Date | null;
}



