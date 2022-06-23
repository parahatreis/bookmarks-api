import { PrismaService } from './../prisma/prisma.service';
import { Body, Injectable } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }
}
