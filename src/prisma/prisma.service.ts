import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly confogServie: ConfigService) {
    super({
      datasources: {
        db: {
          url: confogServie.get<string>('DATABASE_URL'),
        },
      },
    });
  }
}
