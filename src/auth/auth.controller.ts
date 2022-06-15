import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

// '/auth'
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /* Routes */

  // '/auth/signup'
  @Post('signup')
  signup(@Body() dto: AuthDTO) {
    console.log(dto);
    return this.authService.signup();
  }

  // '/auth/signin'
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
