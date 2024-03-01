import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { Event } from './entities/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';
@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [MikroOrmModule.forFeature([Event]), UserModule],
})
export class EventModule {}
