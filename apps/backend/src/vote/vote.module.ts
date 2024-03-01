import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Vote } from './entities/vote.entity';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  controllers: [VoteController],
  providers: [VoteService],
  imports: [MikroOrmModule.forFeature([Vote])],
})
export class VoteModule {}
