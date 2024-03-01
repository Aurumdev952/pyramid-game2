import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { JwtPayload } from './jwt-payload.interface';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();

      const token: string = request.headers['authorization'].split(' ')[1];
      if (!token) throw new UnauthorizedException();
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      console.log('payload', payload);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      request.user = payload;

      return true;
    } catch (err: unknown) {
      throw new UnauthorizedException();
    }
  }
}
