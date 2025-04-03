import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
