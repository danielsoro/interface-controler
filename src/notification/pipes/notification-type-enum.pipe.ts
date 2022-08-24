import { HttpException, ParseEnumPipe } from '@nestjs/common';
import { NotificationType } from '../enums/notification-type.enum';

export const enumValidation = new ParseEnumPipe(NotificationType, {
  exceptionFactory: () => new HttpException('invalid_path_param_type', 400),
});
