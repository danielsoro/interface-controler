import { EmailType } from 'src/notification/enums/email-type.enum';
import { PushType } from 'src/notification/enums/push-type.enum';
import { SMSType } from 'src/notification/enums/sms-type.enum';

export interface Notification<T extends EmailType | PushType | SMSType> {
  type: T;
}
