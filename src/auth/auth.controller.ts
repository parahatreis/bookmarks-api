import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// '/auth'
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /* Routes */

  // '/auth/signup'
  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  // '/auth/signin'
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
