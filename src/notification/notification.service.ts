import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Notification } from './interfaces/event/notification';

@Injectable()
export class NotificationService {
  constructor(private eventEmitter: EventEmitter2) {}

  send(notification: Notification<any>): boolean {
    return this.eventEmitter.emit(
      `${notification.constructor.name}.${notification.type}`,
      notification,
    );
  }
}
