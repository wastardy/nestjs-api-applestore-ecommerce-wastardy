import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import envConfig from 'config/env.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    UserModule,
  ],
})
export class AppModule {}
