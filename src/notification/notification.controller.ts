import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { NotificationType } from './enums/notification-type.enum';
import { Notification } from './interfaces/event/notification';
import { NotificationService } from './notification.service';
import { NotificationParse } from './parse/notification-parse';
import { enumValidation } from './pipes/notification-type-enum.pipe';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/send/:type')
  async sendNotification(
    @Param('type', enumValidation)
    type: NotificationType,
    @Body() notification: Notification<any>,
  ) {
    const body: Notification<any> = NotificationParse.to(type, notification);

    // it could keep here or we can move it to some interceptor/pipe or something that we can reuse in another place.
    // Not sure if we need to take care about reuse it rigth now, we can keep the validation here without issue or just
    // move it to a validation module. :)
    const errors = await validate(body);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const isSent = this.notificationService.send(body);
    if (isSent) {
      return;
    } else {
      throw new InternalServerErrorException(
        `Event without consumer, please configure the app to consume the event ${body.constructor.name}.${body.type}`,
      );
    }
  }
}
