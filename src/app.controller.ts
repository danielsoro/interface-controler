import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Param,
  ParseEnumPipe,
  Post,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsOptional, IsString, validate } from 'class-validator';
import { AppService } from './app.service';

export enum NotificationType {
  SMS = 'SMS',
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
}

const enumValidation = new ParseEnumPipe(NotificationType, {
  exceptionFactory: () => new HttpException('invalid_path_param_type', 400),
});

export class NotificationParse {
  static to(type: NotificationType, notification: Notification<any>) {
    switch (type) {
      case NotificationType.EMAIL:
        return plainToClass(EmailNotification, notification);
      case NotificationType.PUSH:
        return plainToClass(PushNotification, notification);
      case NotificationType.SMS:
        return plainToClass(SMSNotification, notification);
    }
  }
}

export interface Notification<T extends EmailType | PushType | SMSType> {
  type: T;
}

export type EmailOptions = {
  clinica: string;
};

export enum EmailType {
  RESET = 'RESET',
  CONFIRM = 'CONFIRM',
  INVITE = 'INVITE',
}

// Payload Email Notification
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

export enum PushType {
  DEFAULT = 'DEFAULT',
  SENDER_GUID = 'SENDER_GUID',
}

// Payload Push Notification
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

export enum SMSType {
  DEFAULT = 'DEFAULT',
}

// Payload SMS Notification
export class SMSNotification implements Notification<SMSType> {
  @IsEnum(SMSType)
  type: SMSType = SMSType.DEFAULT;

  @IsString()
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/send/:type')
  async sendNotification(
    @Param('type', enumValidation)
    type: NotificationType,
    @Body() notification: Notification<any>,
  ) {
    // Parse Notification Body to the real class
    const body: Notification<any> = NotificationParse.to(type, notification);

    // it could keep here or we can move it to some interceptor/pipe or something that we can reuse in another place.
    // Not sure if we need to take care about reuse it rigth now, we can keep the validation here without issue or just
    // move it to a validation module. :)
    const errors = await validate(body);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const isSent = this.appService.send(body);
    if (isSent) {
      return;
    } else {
      throw new InternalServerErrorException(
        `Event without consumer, please configure the app to consume the event ${body.constructor.name}.${body.type}`,
      );
    }
  }
}
