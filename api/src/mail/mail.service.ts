import { Injectable, Logger } from '@nestjs/common';

export interface MailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Envoi d'e-mails via le webhook Make.com (`MAKE_WEBHOOK_EMAIL_URL`). Si
 * cette variable n'est pas définie, le service fonctionne en mode « no-op »
 * et journalise simplement les messages.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger('Mail');
  private readonly webhookUrl: string | undefined;

  constructor() {
    this.webhookUrl = process.env.MAKE_WEBHOOK_EMAIL_URL;
    if (!this.webhookUrl) {
      this.logger.warn(
        'MAKE_WEBHOOK_EMAIL_URL non défini — les e-mails ne seront pas envoyés (mode simulation).',
      );
    }
  }

  /** Envoie un e-mail via le webhook Make.com. N'échoue jamais : les erreurs sont journalisées. */
  async send(msg: MailMessage): Promise<boolean> {
    if (!this.webhookUrl) {
      this.logger.log(`[simulation] e-mail à ${msg.to} — « ${msg.subject} »`);
      return false;
    }
    try {
      const res = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          EMAIL_PROVIDER: 'ICHH',
          to: msg.to,
          subject: msg.subject,
          content: msg.html ?? msg.text,
        }),
      });
      if (!res.ok) {
        throw new Error(`Webhook a répondu ${res.status}`);
      }
      this.logger.log(`E-mail envoyé à ${msg.to} — « ${msg.subject} »`);
      return true;
    } catch (err) {
      this.logger.error(`Échec de l'envoi à ${msg.to} : ${(err as Error).message}`);
      return false;
    }
  }
}
