import { ConflictException, Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import * as bcryptjs from 'bcryptjs';
import errorConstants from '../constants/error.constants';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password } = signupDto;

    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new ConflictException(errorConstants.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.createUser({
      ...signupDto,
      password: hashedPassword,
    });

    const token = await this.generateToken(newUser);

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
      },
      token,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  }

  private async generateToken(user: User): Promise<{ access_token: string }> {
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });

    return {
      access_token: token,
    };
  }
}
