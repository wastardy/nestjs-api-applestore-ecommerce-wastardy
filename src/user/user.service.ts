import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { SignupDto } from '../auth/dtos/signup.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async createUser(signupDto: SignupDto): Promise<User> {
    const user: User = await this.prismaService.user.create({
      data: {
        username: signupDto.username,
        email: signupDto.email,
        password: signupDto.password,
        firstName: signupDto.firstName,
        lastName: signupDto.lastName,
      },
    });

    return user;
  }
}
