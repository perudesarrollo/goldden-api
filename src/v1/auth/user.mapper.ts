import { UserEntity } from './domain/user.entity';

export function mapPrismaUserToUserEntity(user: any): UserEntity {
  return new UserEntity(
    user.id,
    user.email,
    user.username,
    user.passwordHash,
    user.rol,
    user.nombreCompleto,
    user.activo,
    user.ultimoAcceso,
    user.createdAt,
    user.updatedAt,
    user.deletedAt,
  );
}
