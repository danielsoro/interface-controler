import { plainToClass } from 'class-transformer';
import {
  EmailNotification,
  PushNotification,
  SMSNotification,
} from '../event/notification';
import { NotificationType } from '../enums/notification-type.enum';
import { Notification } from '../interfaces/event/notification';

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
