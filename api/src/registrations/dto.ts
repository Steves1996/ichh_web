import { IsEmail, IsIn, IsOptional, IsString, Length } from 'class-validator';
import { RegistrationStatus } from './registration.entity';

export class CreateRegistrationDto {
  @IsString()
  @Length(2, 160)
  fullName: string;

  @IsString()
  @Length(4, 40)
  phone: string;

  @IsString()
  @Length(2, 120)
  city: string;

  @IsEmail()
  @Length(3, 180)
  email: string;
}

export class UpdateRegistrationDto {
  @IsOptional()
  @IsIn(['nouveau', 'confirme', 'annule'])
  status?: RegistrationStatus;
}
