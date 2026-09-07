import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { CreateSubscriberDto } from './dto';
import { Subscriber } from './subscriber.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber) private readonly repo: Repository<Subscriber>,
    private readonly mail: MailService,
  ) {}

  async subscribe(dto: CreateSubscriberDto) {
    const email = dto.email.trim().toLowerCase();
    let row = await this.repo.findOne({ where: { email } });
    const isNew = !row;
    if (!row) {
      row = await this.repo.save(this.repo.create({ email, notified: false }));
    }

    const sent = await this.mail.send(this.welcomeMessage(email));
    if (sent && !row.notified) {
      row.notified = true;
      await this.repo.save(row);
    }

    return { ok: true, alreadySubscribed: !isNew };
  }

  list() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async remove(id: string) {
    const res = await this.repo.delete({ id });
    if (!res.affected) throw new NotFoundException('Abonné introuvable');
    return { deleted: true };
  }

  private welcomeMessage(email: string) {
    const subject = 'Votre inscription à la lettre d’information — ICHH Yaoundé 2026';
    const text = [
      'Bonjour,',
      '',
      'Votre adresse e-mail a bien été enregistrée pour recevoir la lettre d’information de',
      'l’ICHH Yaoundé 2026 (International Conference on Health and Humanitarian, novembre 2026).',
      '',
      'Vous recevrez une lettre par mois : programme des panels, intervenants confirmés,',
      'formules de participation et travaux du comité scientifique.',
      '',
      'Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer ce message.',
      '',
      '— La Mahola Health Foundation',
      'infos@ichhyde2026.org',
    ].join('\n');

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;color:#0A3A5A;line-height:1.6">
        <p>Bonjour,</p>
        <p>
          Votre adresse e-mail (<strong>${email}</strong>) a bien été enregistrée pour recevoir la
          lettre d’information de l’<strong>ICHH Yaoundé 2026</strong>
          (International Conference on Health and Humanitarian, novembre 2026).
        </p>
        <p>
          Vous recevrez une lettre par mois : programme des panels, intervenants confirmés,
          formules de participation et travaux du comité scientifique.
        </p>
        <p style="color:#5C7B8E;font-size:13px">
          Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer ce message.
        </p>
        <p style="margin-top:24px">
          — La Mahola Health Foundation<br />
          <a href="mailto:infos@ichhyde2026.org" style="color:#0E7C8E">infos@ichhyde2026.org</a>
        </p>
      </div>`;

    return { to: email, subject, text, html };
  }
}
