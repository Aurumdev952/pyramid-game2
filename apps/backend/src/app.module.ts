import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import config from './mikro-orm.config';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot({ ...config, autoLoadEntities: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    EventModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
