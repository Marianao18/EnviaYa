export interface TokenService {
  generateAccessToken(payload: object): string;
  generateRefreshToken(payload: object): string;
  generateVerificationToken(payload: object): string;
  verifyToken(token: string): any;
}
