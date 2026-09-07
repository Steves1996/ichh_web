import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface MailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Envoi d'e-mails via SMTP (nodemailer). Configuration par variables
 * d'environnement (`MAIL_*`). Si `MAIL_HOST` n'est pas défini, le service
 * fonctionne en mode « no-op » et journalise simplement les messages.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger('Mail');
  private readonly transporter: nodemailer.Transporter | null;
  private readonly from: string;

  constructor() {
    const host = process.env.MAIL_HOST;
    this.from =
      process.env.MAIL_FROM ??
      (process.env.MAIL_USER ? `ICHH Yaoundé 2026 <${process.env.MAIL_USER}>` : 'no-reply@localhost');

    if (!host) {
      this.transporter = null;
      this.logger.warn('MAIL_HOST non défini — les e-mails ne seront pas envoyés (mode simulation).');
      return;
    }

    const port = Number(process.env.MAIL_PORT ?? 465);
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: (process.env.MAIL_SECURE ?? 'true') === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }

  /** Envoie un e-mail. N'échoue jamais : les erreurs sont journalisées. */
  async send(msg: MailMessage): Promise<boolean> {
    if (!this.transporter) {
      this.logger.log(`[simulation] e-mail à ${msg.to} — « ${msg.subject} »`);
      return false;
    }
    try {
      await this.transporter.sendMail({
        from: this.from,
        to: msg.to,
        subject: msg.subject,
        text: msg.text,
        html: msg.html ?? msg.text,
      });
      this.logger.log(`E-mail envoyé à ${msg.to} — « ${msg.subject} »`);
      return true;
    } catch (err) {
      this.logger.error(`Échec de l'envoi à ${msg.to} : ${(err as Error).message}`);
      return false;
    }
  }
}
