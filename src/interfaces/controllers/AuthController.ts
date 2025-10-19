import { Request, Response } from "express";
import { MongoUserRepository } from "../../infrastructure/database/mongoose/MongoUserRepository";
import { BcryptService } from "../../infrastructure/security/BcryptService";
import { JwtService } from "../../infrastructure/auth/JwtService";
import { NodemailerService } from "../../infrastructure/email/NodemailerService";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";
import { VerifyEmailUseCase } from "../../application/use-cases/VerifyEmailUseCase";

const repo = new MongoUserRepository();
const bcrypt = new BcryptService();
const jwt = new JwtService();
const mail = new NodemailerService();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const useCase = new RegisterUserUseCase(repo, bcrypt, jwt, mail);
      const result = await useCase.execute(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async verify(req: Request, res: Response) {
    try {
      const useCase = new VerifyEmailUseCase(repo, jwt);
      const result = await useCase.execute(req.params.token);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const useCase = new LoginUserUseCase(repo, bcrypt, jwt);
      const result = await useCase.execute(req.body.email, req.body.password);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
