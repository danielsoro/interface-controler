import { Module } from '@nestjs/common';
import { EmailListenersService } from './email-listeners.service';

@Module({
  providers: [EmailListenersService],
})
export class ListenersModule {}
