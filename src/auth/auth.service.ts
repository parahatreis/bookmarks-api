import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return {
      msg: 'mr.parahat28@gmail.com Signed up',
    };
  }
  signin() {
    return {
      msg: 'mr.parahat28@gmail.com Signed in',
    };
  }
}
