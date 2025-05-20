import { RolUsuario } from './rol.enum';

export class UserEntity {
  id: number;
  email: string;
  username: string;
  passwordHash: string;
  rol: RolUsuario;
  nombreCompleto: string;
  activo: boolean;
  ultimoAcceso: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(
    id: number,
    email: string,
    username: string,
    passwordHash: string,
    rol: RolUsuario,
    nombreCompleto: string,
    activo: boolean,
    ultimoAcceso: Date | null,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.passwordHash = passwordHash;
    this.rol = rol;
    this.nombreCompleto = nombreCompleto;
    this.activo = activo;
    this.ultimoAcceso = ultimoAcceso;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
