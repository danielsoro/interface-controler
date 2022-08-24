import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationModule } from './notification/notification.module';
import { ListenersModule } from './listeners/listeners.module';

@Module({
  imports: [EventEmitterModule.forRoot(), NotificationModule, ListenersModule],
})
export class AppModule {}
