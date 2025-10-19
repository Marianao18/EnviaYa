// src/infrastructure/database/mongoose/MongoUserRepository.ts
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/entities/User";
import { UserModel } from "./models/UserModel";

export class MongoUserRepository implements UserRepository {

  async create(data: Partial<User>): Promise<User> {
    // Creamos el documento con los campos obligatorios
    const doc = new UserModel({
      name: data.name!,
      lastname: data.lastname!,
      email: data.email!,
      password: data.password!,
      isEmailVerified: false, // valor por defecto
      loginAttempts: 0,
      lockedUntil: null,
    });

    // Guardamos en Mongo
    const saved = await doc.save();

    // Retornamos el objeto del dominio (limpio)
    return {
      id: saved._id.toString(),
      name: saved.name,
      lastname: saved.lastname,
      email: saved.email,
      password: saved.password,
      isVerified: saved.isEmailVerified,
      loginAttempts: saved.loginAttempts ?? 0,
      lockedUntil: saved.lockedUntil ?? null,
    } as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email }).lean();

    if (!doc) return null;

    return {
      id: doc._id.toString(),
      name: doc.name,
      lastname: doc.lastname,
      email: doc.email,
      password: doc.password,
      isVerified: doc.isEmailVerified,
      loginAttempts: doc.loginAttempts ?? 0,
      lockedUntil: doc.lockedUntil ?? null,
    } as User;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id).lean();
    if (!doc) return null;

    return {
      id: doc._id.toString(),
      name: doc.name,
      lastname: doc.lastname,
      email: doc.email,
      password: doc.password,
      isVerified: doc.isEmailVerified,
      loginAttempts: doc.loginAttempts ?? 0,
      lockedUntil: doc.lockedUntil ?? null,
    } as User;
  }

  async update(user: User): Promise<User> {
    const updated = await UserModel.findByIdAndUpdate(
      user.id,
      {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        isEmailVerified: user.isVerified,
        loginAttempts: user.loginAttempts,
        lockedUntil: user.lockedUntil,
      },
      { new: true }
    ).lean();

    if (!updated) throw new Error("Usuario no encontrado");

    return {
      id: updated._id.toString(),
      name: updated.name,
      lastname: updated.lastname,
      email: updated.email,
      password: updated.password,
      isVerified: updated.isEmailVerified,
      loginAttempts: updated.loginAttempts ?? 0,
      lockedUntil: updated.lockedUntil ?? null,
    } as User;
  }
}




