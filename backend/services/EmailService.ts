import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendWelcomeEmail(email: string, nome: string) {
    const assunto = "Bem-vindo ao App Scholar!";
    const html = `
        <div style="font-family: sans-serif; color: #333;">
        <h1>Olá, ${nome}!</h1>
        <p>Sua conta no <b>App Scholar</b> foi criada com sucesso.</p>
        <p>Para o seu primeiro acesso, utilize a senha padrão: <b>usuario123</b></p>
        <p>Por questões de segurança, recomendamos que você acesse a tela de login e clique em <b>"Esqueci minha senha"</b> para cadastrar uma senha pessoal.</p>
        <br />
        <p>Atenciosamente,<br />Equipe Acadêmica</p>
      </div>
        `;

    return await this.transporter.sendMail({
      from: `"App Scholar" <no-reply@scholar.com>`,
      to: email,
      subject: assunto,
      html,
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const assunto = "Recuperação de Senha - App Scholar";
    const html = `
      <div style="font-family: sans-serif; color: #333;">
      <h2>Recuperação de Senha</h2>
      <p>Você solicitou a alteração de sua senha no App Scholar.</p>
      <p>Copie o token abaixo e cole no aplicativo para prosseguir:</p>
      <div style="background: #f4f4f4; padding: 10px; border-radius: 5px; word-break: break-all;">
        <code style="font-weight: bold; color: #008b8b;">${token}</code>
      </div>
      <p>Este token expira em 15 minutos.</p>
    </div>
    `;

    return await this.transporter.sendMail({
      from: `"App Scholar" <no-reply@scholar.com>`,
      to: email,
      subject: assunto,
      html,
    });
  }
}

export default new EmailService();

/* const emailService = new EmailService();
const resultado = async () => {
  await emailService.sendWelcomeEmail(
    "carlos123cadu12355@gmail.com",
    "Carlos",
  );
};

console.log(resultado());
 */
