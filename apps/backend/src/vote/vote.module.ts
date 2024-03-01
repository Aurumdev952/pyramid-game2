import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { Event } from '../event/entities/event.entity';
import { User } from '../user/entities/user.entity';
import { Vote } from './entities/vote.entity';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  controllers: [VoteController],
  providers: [VoteService],
  imports: [MikroOrmModule.forFeature([Vote, Event, User]), UserModule],
})
export class VoteModule {}
