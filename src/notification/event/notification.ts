import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EmailType } from '../enums/email-type.enum';
import { PushType } from '../enums/push-type.enum';
import { SMSType } from '../enums/sms-type.enum';
import { Notification } from '../interfaces/event/notification';

export type EmailOptions = {
  clinica: string;
};

export class EmailNotification implements Notification<EmailType> {
  @IsEnum(EmailType)
  type: EmailType;

  @IsString()
  token: string;

  @IsString()
  to: string;

  @IsOptional()
  options?: EmailOptions;
}

export class PushNotification implements Notification<PushType> {
  @IsEnum(PushType)
  type: PushType = PushType.DEFAULT;

  @IsString()
  token: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsOptional()
  data?: any;
}

export class SMSNotification implements Notification<SMSType> {
  @IsEnum(SMSType)
  type: SMSType = SMSType.DEFAULT;

  @IsString()
  message: string;
}
