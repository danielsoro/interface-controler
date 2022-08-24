import { Injectable } from '@nestjs/common';
import { EmailNotification } from 'src/notification/event/notification';
import { OnConfirmEmailEvent } from './decorators/email/on-confirm-email-event.decorator';
import { OnInviteEmailEvent } from './decorators/email/on-invite-email-event.decorator';
import { OnResetEmailEvent } from './decorators/email/on-reset-email-event.decorator';

@Injectable()
export class EmailListenersService {
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
