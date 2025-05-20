import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedVendedoresYClientes(count = 10) {
  const usuarios = await prisma.usuario.findMany();
  const personas = await prisma.persona.findMany();

  if (usuarios.length < count) {
    throw new Error(
      `Se requieren al menos ${count} usuarios para crear vendedores.`,
    );
  }

  if (personas.length < count * 2) {
    throw new Error(
      `Se requieren al menos ${count * 2} personas para crear vendedores y clientes.`,
    );
  }

  const vendedores: Array<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    nombre: string;
    correo: string;
    telefono: string;
    auditoriaId: number | null;
    usuarioId: number;
    apellido: string;
    fechaIngreso: Date;
    nivelComisionId: number | null;
  }> = [];

  // Crear vendedores
  for (let i = 0; i < count; i++) {
    const usuario = usuarios[i]; // se asume usuarios únicos
    const nombre = faker.name.firstName();
    const apellido = faker.name.lastName();
    const correo = faker.internet.email({
      firstName: nombre,
      lastName: apellido,
    });
    const telefono = faker.phone.number();

    const vendedor = await prisma.vendedor.create({
      data: {
        usuarioId: usuario.id,
        nombre,
        apellido,
        correo,
        telefono,
        nivelComisionId: null
      },
    });

    vendedores.push(vendedor);
    console.log(`Vendedor creado: ${vendedor.nombre} ${vendedor.apellido}`);
  }

  // Crear clientes asociados a los vendedores
  const personasUsadas = new Set<number>();

  for (let i = 0; i < count; i++) {
    const persona = personas.find((p) => !personasUsadas.has(p.id));
    if (!persona) break;

    personasUsadas.add(persona.id);

    const vendedor = faker.helpers.arrayElement(vendedores);

    const cliente = await prisma.cliente.create({
      data: {
        personaId: persona.id,
        vendedorId: vendedor.id,
      },
    });

    console.log(
      `Cliente creado para persona ID: ${persona.id} con vendedor ID: ${vendedor.id}`,
    );
  }
}

seedVendedoresYClientes()
  .then(() => {
    console.log('Seed de vendedores y clientes finalizado.');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('Error al ejecutar seed de vendedores/clientes:', e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
