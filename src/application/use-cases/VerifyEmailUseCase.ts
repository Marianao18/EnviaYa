import { UserRepository } from "../../domain/repositories/UserRepository";
import { TokenService } from "../../domain/services/TokenService";

export class VerifyEmailUseCase {
  constructor(
    private userRepo: UserRepository,
    private tokenService: TokenService
  ) {}

  async execute(token: string) {
    const decoded: any = this.tokenService.verifyToken(token);
    const user = await this.userRepo.findById(decoded.id);
    if (!user) throw new Error("Usuario no encontrado");

    user.isVerified = true;
    await this.userRepo.update(user);
    return { message: "Cuenta verificada correctamente" };
  }
}
