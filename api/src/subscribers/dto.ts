import { IsEmail, Length } from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail()
  @Length(3, 180)
  email: string;
}
