import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: {},
      include: {
        uploadedSongs: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      // select: {
      //   id: true,
      //   username: true,
      //   email: true,
      //   role: true,
      //   registeredAt: true,
      //   updatedAt: true,
      //   uploadedSongs: true,
      //   favorites: true,
      // },
      include: {
        uploadedSongs: true,
        favorites: true,
      },
    });

    if (user) {
      delete user.password;
      delete user.refreshToken;
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
      include: {
        uploadedSongs: true,
      },
    });
  }
}
