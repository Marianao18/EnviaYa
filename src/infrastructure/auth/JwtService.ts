import jwt from "jsonwebtoken";
import { TokenService } from "../../domain/services/TokenService"; // ajusta la ruta según tu estructura

export class JwtService implements TokenService {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
    if (!this.secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
  }

  generateAccessToken(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: "15m" }); // token de acceso corto
  }

  generateRefreshToken(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: "7d" }); // token de refresco
  }

  generateVerificationToken(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1d" }); // para verificación por email
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.secret);
  }
}


