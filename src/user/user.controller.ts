import { JwtGuard } from './../auth/guard/jwt.guard';
import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  // This is auth middleware to authenticate users with token
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser('id') userId: number) {
    return userId;
  }

  @Patch()
  editUser() {}
}
