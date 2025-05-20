import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { UserEntity } from './domain/user.entity';
import * as bcrypt from 'bcrypt';
import { mapPrismaUserToUserEntity } from './user.mapper';
@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser(loginDto: {
    email: string;
    password: string;
  }): Promise<UserEntity> {
    const user = await this.prismaService.usuario.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return mapPrismaUserToUserEntity(user);
  }
}
