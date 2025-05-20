import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const provinciasEcuador = {
  Pichincha: ['Quito', 'Cayambe', 'Sangolquí'],
  Guayas: ['Guayaquil', 'Daule', 'Samborondón'],
  Azuay: ['Cuenca', 'Gualaceo', 'Paute'],
  Manabí: ['Portoviejo', 'Manta', 'Chone'],
  'El Oro': ['Machala', 'Pasaje', 'Santa Rosa'],
  Tungurahua: ['Ambato', 'Baños', 'Pelileo'],
  Loja: ['Loja', 'Catamayo', 'Macará'],
  Imbabura: ['Ibarra', 'Otavalo', 'Cotacachi'],
  Esmeraldas: ['Esmeraldas', 'Atacames', 'Quinindé'],
};

async function seedUbicaciones() {
  const pais = await prisma.pais.create({
    data: {
      nombre: 'Ecuador',
      codigoISO: 'EC',
    },
  });

  for (const [provinciaNombre, ciudades] of Object.entries(provinciasEcuador)) {
    const provincia = await prisma.provincia.create({
      data: {
        nombre: provinciaNombre,
        paisId: pais.id,
      },
    });

    for (const ciudadNombre of ciudades) {
      await prisma.ciudad.create({
        data: {
          nombre: ciudadNombre,
          provinciaId: provincia.id,
          codigoPostal: faker.location.zipCode('EC###'),
        },
      });
    }

    console.log(
      `Provincia ${provinciaNombre} creada con ciudades: ${ciudades.join(', ')}`,
    );
  }

  console.log('Seed de país, provincias y ciudades completado.');
}

seedUbicaciones()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('Error al ejecutar el seed de ubicaciones:', e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
