/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { SignupDto } from '../auth/dtos/signup.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    }

    return user;
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async createUser(signupDto: SignupDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email: signupDto.email,
        password: signupDto.password,
        firstName: signupDto.firstName,
        lastName: signupDto.lastName,
      },
    });
  }
}
