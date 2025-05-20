import { PrismaClient, EstadoCotizacion, TipoSeguro } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedCotizaciones(count = 50) {
  const leads = await prisma.persona.findMany();
  const vendedores = await prisma.vendedor.findMany();
  const clientes = await prisma.cliente.findMany();

  if (leads.length === 0 || vendedores.length === 0) {
    throw new Error(
      'Se necesitan al menos un lead y un vendedor para crear cotizaciones.',
    );
  }

  for (let i = 0; i < count; i++) {
    const lead = faker.helpers.arrayElement(leads);
    const vendedor = faker.helpers.arrayElement(vendedores);
    const cliente = faker.helpers.arrayElement([...clientes, null]); // cliente puede ser opcional

    const fechaCotizacion = faker.date.recent({ days: 30 });
    const fechaExpiracion = faker.date.soon({
      days: 15,
      refDate: fechaCotizacion,
    });

    const primaNeta = parseFloat(faker.finance.amount({ min: 100, max: 1000 }));
    const impuestos = parseFloat((primaNeta * 0.12).toFixed(2));
    const comision = parseFloat((primaNeta * 0.05).toFixed(2));
    const primaTotal = parseFloat((primaNeta + impuestos).toFixed(2));

    await prisma.cotizacion.create({
      data: {
        leadId: lead.id,
        vendedorId: vendedor.id,
        clienteId: cliente?.id ?? null,
        estado: faker.helpers.arrayElement(Object.values(EstadoCotizacion)),
        fechaCotizacion,
        fechaExpiracion,
        aseguradora: faker.company.name(),
        renovacionAuto: faker.datatype.boolean(),
        tipoSeguro: faker.helpers.arrayElement(Object.values(TipoSeguro)),
        primaNeta,
        impuestos,
        comision,
        primaTotal,
      },
    });

    console.log(`Cotización ${i + 1} creada para el lead ID ${lead.id}`);
  }
}

seedCotizaciones()
  .then(() => {
    console.log('Seed de cotizaciones finalizado.');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('Error al ejecutar seed de cotizaciones:', e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
