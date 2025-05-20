import { PrismaClient, RolUsuario } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedUsers(count = 10) {
  for (let i = 0; i < count; i++) {
    const password = faker.internet.password();
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('password', password)
    await prisma.usuario.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        passwordHash: hashedPassword,
        nombreCompleto: faker.name.fullName(),
        rol: faker.helpers.arrayElement([
          RolUsuario.ADMIN,
          RolUsuario.VENDEDOR,
          RolUsuario.ANALISTA,
          RolUsuario.CLIENTE,
          RolUsuario.SOPORTE,
        ]),
        activo: true,
        ultimoAcceso: faker.date.recent(),
      },
    });

    console.log(`Usuario ${i + 1} creado con contraseña: ${password}`);
  }
}

seedUsers()
  .then(() => {
    console.log('Seed finalizado');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('Error al ejecutar el seed:', e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
