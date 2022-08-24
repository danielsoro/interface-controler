import { applyDecorators } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OnEventOptions } from '@nestjs/event-emitter/dist/interfaces';
import { EmailType } from 'src/notification/enums/email-type.enum';
import { EmailNotification } from 'src/notification/event/notification';

export function OnInviteEmailEvent(options?: OnEventOptions | undefined) {
  return applyDecorators(
    OnEvent(`${EmailNotification.name}.${EmailType.INVITE}`, options),
  );
}
