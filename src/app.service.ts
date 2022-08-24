import { applyDecorators, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OnEventOptions } from '@nestjs/event-emitter/dist/interfaces';
import { EmailNotification, Notification } from './app.controller';

export function OnResetEmailEvent(options?: OnEventOptions | undefined) {
  return applyDecorators(OnEvent('EmailNotification.RESET', options));
}

export function OnConfirmEmailEvent(options?: OnEventOptions | undefined) {
  return applyDecorators(OnEvent('EmailNotification.CONFIRM', options));
}

export function OnInviteEmailEvent(options?: OnEventOptions | undefined) {
  return applyDecorators(OnEvent('EmailNotification.INVITE', options));
}

@Injectable()
export class AppService {
  constructor(private eventEmitter: EventEmitter2) {}

  send(notification: Notification<any>): boolean {
    return this.eventEmitter.emit(
      `${notification.constructor.name}.${notification.type}`,
      notification,
    );
  }

  @OnResetEmailEvent()
  handleResetEmailEvent(payload: EmailNotification) {
    console.log(payload);
  }

  @OnConfirmEmailEvent()
  handleConfirmEmail(payload: EmailNotification) {
    console.log(payload);
  }

  @OnInviteEmailEvent()
  handleEmail(payload: EmailNotification) {
    console.log(payload);
  }
}
