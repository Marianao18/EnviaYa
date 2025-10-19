import { UserRepository } from "../../domain/repositories/UserRepository";
import { PasswordService } from "../../domain/services/PasswordService";
import { TokenService } from "../../domain/services/TokenService";

export class LoginUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Credenciales inválidas");

    // Bloqueo
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new Error("Cuenta bloqueada temporalmente");
    }

    const valid = await this.passwordService.compare(password, user.password);
    if (!valid) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;
      if (user.loginAttempts >= 3) {
        user.lockedUntil = new Date(Date.now() + 5 * 60000);
        user.loginAttempts = 0;
      }
      await this.userRepo.update(user);
      throw new Error("Contraseña incorrecta");
    }

    user.loginAttempts = 0;
    await this.userRepo.update(user);

    if (!user.isVerified)
      throw new Error("Debes verificar tu correo antes de iniciar sesión.");

    const access = this.tokenService.generateAccessToken({ id: user.id });
    const refresh = this.tokenService.generateRefreshToken({ id: user.id });
    return { access, refresh };
  }
}
