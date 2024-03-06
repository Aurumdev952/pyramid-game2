import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from './user.guard';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('users')
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    console.log(req.payload);
    return this.userService.findAll();
  }

  @Post('signup')
  async signUp(
    @Body() newUser: CreateUserDto,
  ): Promise<{ user: Partial<User>; token: string }> {
    try {
      const { user, token }: { user: Partial<User>; token: string } =
        await this.userService.signUp(newUser);
      delete user.password;
      return { user, token };
    } catch (err: unknown) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('signin')
  async signIn(
    @Body() credentials: LoginDto,
  ): Promise<{ user: Partial<User>; token: string }> {
    try {
      const { user, token }: { user: Partial<User>; token: string } =
        await this.userService.signIn(credentials);

      delete user.password;

      return { user, token };
    } catch (err: unknown) {
      throw new InternalServerErrorException(err);
    }
  }
}
