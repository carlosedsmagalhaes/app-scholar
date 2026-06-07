import sgMail from "@sendgrid/mail";
import { config } from "dotenv";

config();

class EmailService {
  private readonly apiKey = process.env.SENDGRID_API_KEY;
  private readonly senderEmail = process.env.SENDGRID_SENDER_EMAIL ?? "no-reply@scholar.com";
  private readonly senderName = process.env.SENDGRID_SENDER_NAME ?? "App Scholar";

  private async sendEmail(to: string, subject: string, html: string, text: string, name?: string) {
    if (!this.apiKey) {
      throw new Error("SENDGRID_API_KEY nao configurada.");
    }

    sgMail.setApiKey(this.apiKey);

    return sgMail.send({
      to: {
        email: to,
        name,
      },
      from: {
        email: this.senderEmail,
        name: this.senderName,
      },
      subject,
      html,
      text,
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
      const text = [
        `Olá, ${nome}!`,
        "Sua conta no App Scholar foi criada com sucesso.",
        "Para o seu primeiro acesso, utilize a senha padrão: usuario123",
        'Por questões de segurança, recomendamos que você acesse a tela de login e clique em "Esqueci minha senha" para cadastrar uma senha pessoal.',
        "",
        "Atenciosamente,",
        "Equipe Acadêmica",
      ].join("\n");

      return this.sendEmail(email, assunto, html, text, nome);
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
    const text = [
      "Recuperação de Senha",
      "Você solicitou a alteração de sua senha no App Scholar.",
      "Copie o token abaixo e cole no aplicativo para prosseguir:",
      token,
      "",
      "Este token expira em 15 minutos.",
    ].join("\n");

    return this.sendEmail(email, assunto, html, text);
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

resultado().then(() => {
  console.log("Email enviado com sucesso!");
}).catch((error) => {
  console.error("Erro ao enviar email:", error);
}); */

