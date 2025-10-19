// src/infrastructure/database/mongoose/models/UserModel.ts
import { Schema, model, type InferSchemaType } from "mongoose";

// Definición del esquema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
  },
  { versionKey: false }
);

// Inferencia automática del tipo de documento
export type UserDocument = InferSchemaType<typeof userSchema>;

// Exportamos el modelo
export const UserModel = model<UserDocument>("User", userSchema);







