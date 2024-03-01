import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { AuthGuard } from './user.guard';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  imports: [MikroOrmModule.forFeature([User])],
  exports: [AuthGuard],
})
export class UserModule {}
