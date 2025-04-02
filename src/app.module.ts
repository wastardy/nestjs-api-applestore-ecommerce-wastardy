import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import envConfig from 'config/env.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    UserModule,
    ProductModule,
    PrismaModule,
  ],
})
export class AppModule {}
