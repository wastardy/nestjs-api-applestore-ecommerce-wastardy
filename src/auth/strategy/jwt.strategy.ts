import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import errorConstants from 'src/constants/error.constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const jwtSecretKey = configService.get<string>('JWT_SECRET_KEY');

    if (!jwtSecretKey) {
      throw new ConflictException(errorConstants.JWT_SECRET_IS_NOT_DEFINED);
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecretKey,
    });
  }

  async validate(payload: { id: string; email: string }) {
    // probably its better to find user by id 🤔

    const user = await this.userService.findByEmail(payload.email);

    return user;
  }
}
