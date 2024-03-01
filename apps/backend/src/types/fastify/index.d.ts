import { JwtPayload } from '../../user/jwt-payload.interface';

declare module 'fastify' {
  interface FastifyRequest {
    user: JwtPayload;
  }
  interface Request {
    user: JwtPayload;
  }
}
