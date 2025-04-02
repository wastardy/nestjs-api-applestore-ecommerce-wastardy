/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  readonly password: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  readonly lastName?: string;
}
