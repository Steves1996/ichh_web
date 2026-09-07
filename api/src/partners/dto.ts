import { IsEmail, IsIn, IsOptional, IsString, Length } from 'class-validator';
import { PartnerRequestStatus } from './partner-request.entity';

export class CreatePartnerRequestDto {
  @IsString()
  @Length(2, 160)
  name: string;

  @IsString()
  @Length(4, 40)
  phone: string;

  @IsEmail()
  @Length(3, 180)
  email: string;

  @IsString()
  @Length(5, 4000)
  message: string;
}

export class UpdatePartnerRequestDto {
  @IsOptional()
  @IsIn(['nouveau', 'en_cours', 'traite'])
  status?: PartnerRequestStatus;
}
