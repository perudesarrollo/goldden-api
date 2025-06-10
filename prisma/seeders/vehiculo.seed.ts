import { PrismaClient, OrigenVehiculo } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const ORIGENES: OrigenVehiculo[] = ['CHINO', 'JAPONES', 'AMERICANO', 'EUROPEO'];

async function seed() {
  console.log('🧹 Limpiando tablas...');
  await prisma.vehiculo.deleteMany({});
  await prisma.modeloVehiculo.deleteMany({});
  await prisma.marcaVehiculo.deleteMany({});

  const marcasCreadas: { marca: Awaited<ReturnType<typeof prisma.marcaVehiculo.create>>, modelos: Awaited<ReturnType<typeof prisma.modeloVehiculo.create>>[] }[] = [];

  console.log('🚗 Generando marcas y modelos...');
  for (let i = 0; i < 5; i++) {
    const marca = await prisma.marcaVehiculo.create({
      data: {
        nombre: faker.vehicle.manufacturer() + ` ${faker.string.alpha(2).toUpperCase()}`, // para evitar duplicados
        origen: faker.helpers.arrayElement(ORIGENES),
      },
    });

    const modelos: Awaited<ReturnType<typeof prisma.modeloVehiculo.create>>[] = [];
    const cantidadModelos = faker.number.int({ min: 2, max: 4 });

    for (let j = 0; j < cantidadModelos; j++) {
      const modelo = await prisma.modeloVehiculo.create({
        data: {
          nombre: faker.vehicle.model() + ` ${faker.string.alpha(2).toUpperCase()}`,
          marcaId: marca.id,
        },
      });
      modelos.push(modelo);
    }

    marcasCreadas.push({ marca, modelos });
  }

  console.log('🚐 Generando vehículos...');
  const clienteId = 1;

  for (let i = 0; i < 50; i++) {
    const marcaRandom = faker.helpers.arrayElement(marcasCreadas);
    const modeloRandom = faker.helpers.arrayElement(marcaRandom.modelos);

    await prisma.vehiculo.create({
      data: {
        clienteId,
        modeloVehiculoId: modeloRandom.id,
        anio: faker.date.past({ years: 15 }).getFullYear(),
        numeroChassis: faker.string.alphanumeric(17).toUpperCase(),
        numeroMotor: faker.string.alphanumeric(10).toUpperCase(),
        placa: `${faker.string.alphanumeric(3).toUpperCase()}-${faker.string.numeric(3)}`,
        uso: faker.helpers.arrayElement(['Particular', 'Comercial', 'Carga', 'Oficial']),
      },
    });
  }

  console.log('✅ Seed generado dinámicamente con faker.');
}

seed()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
