import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedParentescos(count = 10) {
  const nombresUnicos = new Set<string>();
  while (nombresUnicos.size < count) {
    nombresUnicos.add(faker.person.jobTitle());
  }

  const nombresArray = Array.from(nombresUnicos);

  for (let i = 0; i < nombresArray.length; i++) {
    const nombre = nombresArray[i];
    const descripcion = faker.lorem.sentence();

    await prisma.parentesco.create({
      data: {
        nombre,
        descripcion,
      },
    });

    console.log(`Parentesco "${nombre}" creado`);
  }
}

seedParentescos()
  .then(() => {
    console.log('Seed de Parentescos finalizado');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('Error al ejecutar el seed:', e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
