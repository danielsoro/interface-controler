import { applyDecorators } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OnEventOptions } from '@nestjs/event-emitter/dist/interfaces';

export function OnResetEmailEvent(options?: OnEventOptions | undefined) {
  return applyDecorators(OnEvent('EmailNotification.RESET', options));
}
