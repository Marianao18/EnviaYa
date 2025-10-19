import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export class NodemailerService {
  private transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendVerificationEmail(email: string, link: string) {
    await this.transporter.sendMail({
      from: `"Soporte EnviaYa" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verifica tu cuenta",
      html: `<p>Haz clic aquí para confirmar tu cuenta: <a href="${link}">${link}</a></p>`,
    });
  }
}
