import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  // constructor(private userService: UserService) {}
  @Get('me')
  getMe() {
    return { msg: 'ME' };
  }
}
