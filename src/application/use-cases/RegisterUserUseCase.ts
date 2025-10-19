import { UserRepository } from "../../domain/repositories/UserRepository";
import { PasswordService } from "../../domain/services/PasswordService";
import { TokenService } from "../../domain/services/TokenService";
import { NodemailerService } from "../../infrastructure/email/NodemailerService";

export class RegisterUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService,
    private mailService: NodemailerService
  ) {}

  async execute(data: { name: string; lastname: string; email: string; password: string }) {
    const { name, lastname, email, password } = data;

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(password)) throw new Error("Contraseña insegura");

    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error("El correo ya está registrado");

    const hashed = await this.passwordService.hash(password);

    const user = await this.userRepo.create({
      name,
      lastname,
      email,
      password: hashed,
      isVerified: false,
    });

    const token = this.tokenService.generateVerificationToken({ id: user.id });
    const link = `http://localhost:3000/api/auth/verify/${token}`;
    //await this.mailService.sendVerificationEmail(email, link);
  }
}

