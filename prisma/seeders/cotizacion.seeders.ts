import { PrismaClient, EstadoCotizacion, TipoSeguro } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedCotizaciones(count = 50) {
  const leads = await prisma.persona.findMany();
  const vendedores = await prisma.vendedor.findMany();
  const clientes = await prisma.cliente.findMany();
  const vehiculos = await prisma.vehiculo.findMany();
  const aseguradoras = await prisma.aseguradora.findMany({
    include: { productos: { include: { coberturas: true } } },
  });

  if (leads.length === 0 || vendedores.length === 0 || aseguradoras.length === 0 || vehiculos.length === 0) {
    throw new Error('Se necesitan datos en leads, vendedores, aseguradoras y vehículos.');
  }

  for (let i = 0; i < count; i++) {
    const lead = faker.helpers.arrayElement(leads);
    const vendedor = faker.helpers.arrayElement(vendedores);
    const cliente = faker.helpers.arrayElement([...clientes, null]);
    const aseguradora = faker.helpers.arrayElement(aseguradoras);
    const producto = faker.helpers.arrayElement(aseguradora.productos);
    const vehiculo = faker.helpers.arrayElement(vehiculos);

    const fechaCotizacion = faker.date.recent({ days: 30 });
    const fechaExpiracion = faker.date.soon({ days: 15, refDate: fechaCotizacion });

    const valorAsegurado = parseFloat(faker.finance.amount({ min: 10000, max: 50000 }));
    const tasa = parseFloat(faker.finance.amount({ min: 0.01, max: 0.1 }));
    const primaNeta = parseFloat((valorAsegurado * tasa).toFixed(2));
    const primaTotal = parseFloat((primaNeta * 1.18).toFixed(2)); // Asumiendo 18% impuestos

    const cotizacion = await prisma.cotizacion.create({
      data: {
        leadId: lead.id,
        vendedorId: vendedor.id,
        clienteId: cliente?.id ?? null,
        estado: faker.helpers.arrayElement(Object.values(EstadoCotizacion)),
        tipo: faker.helpers.arrayElement(Object.values(TipoSeguro)),
        fechaCotizacion,
        fechaExpiracion,
        renovacionAuto: faker.datatype.boolean(),

        cotizacionVehicular: {
          create: {
            vehiculoId: vehiculo.id,
            aseguradoraId: aseguradora.id,
            productoId: producto.id,
            valorAsegurado,
            tasa,
            primaNeta,
            primaTotal,
            vigente: true,

            coberturasSeleccionadas: {
              create: producto.coberturas.map((cobertura) => ({
                coberturaSeguroId: cobertura.id,
              })),
            },
          },
        },
      },
    });

    console.log(`Cotización ${i + 1} creada con ID ${cotizacion.id}`);
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
