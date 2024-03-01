import { JwtPayload } from '../user/jwt-payload.interface';

export interface AuthRequest extends Request {
  user: JwtPayload;
}
