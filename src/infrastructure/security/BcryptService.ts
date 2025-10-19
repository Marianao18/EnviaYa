import bcrypt from "bcrypt";
import { PasswordService } from "../../domain/services/PasswordService";

export class BcryptService implements PasswordService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}
