import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
