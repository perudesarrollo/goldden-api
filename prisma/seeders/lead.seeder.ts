import {
  PrismaClient,
  Gender,
  TypePerson,
  MaritalStatusPerson,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedPersonas(count = 100) {
  const ciudades = await prisma.ciudad.findMany();
  if (ciudades.length === 0) {
    throw new Error('No hay ciudades registradas en la base de datos.');
  }

  for (let i = 0; i < count; i++) {
    const ciudad = faker.helpers.arrayElement(ciudades);

    const tipoPersona = faker.helpers.arrayElement([
      TypePerson.N,
      TypePerson.J,
    ]);
    const genero = faker.helpers.arrayElement([Gender.MASCULINO, Gender.FEMENINO]);
    const estadoCivil = faker.helpers.arrayElement([
      MaritalStatusPerson.S,
      MaritalStatusPerson.C,
      MaritalStatusPerson.D,
      MaritalStatusPerson.V,
      MaritalStatusPerson.U,
      MaritalStatusPerson.SP,
      MaritalStatusPerson.O,
    ]);

    const nombre = faker.name.firstName(
      genero === Gender.MASCULINO ? 'male' : 'female',
    );
    const apellidos = faker.name.lastName();
    const numeroDocumento = faker.string.numeric(10);
    const correo = faker.internet.email({
      firstName: nombre,
      lastName: apellidos,
    });
    const telefono = faker.phone.number();
    const avatar = faker.image.avatar();
    const fechaNacimiento = faker.date.birthdate({
      min: 18,
      max: 70,
      mode: 'age',
    });
    const nombreConyugue =
      estadoCivil === MaritalStatusPerson.C ? faker.name.fullName() : null;
    const ciConyugue = nombreConyugue ? faker.string.numeric(10) : null;

    await prisma.persona.create({
      data: {
        tipoPersona,
        nombre,
        apellidos,
        numeroDocumento,
        fechaNacimiento,
        correo,
        telefono,
        ciudadId: ciudad.id,
        avatar,
        contratante: faker.datatype.boolean(),
        genero,
        estadoCivil,
        nombreConyugue,
        ciConyugue,
        activos: parseFloat(faker.finance.amount({ min: 1000, max: 10000 })),
        pasivos: parseFloat(faker.finance.amount({ min: 10, max: 1000 })),
        ingresos: parseFloat(faker.finance.amount({ min: 500, max: 5000 })),
        egresos: parseFloat(faker.finance.amount({ min: 200, max: 4000 })),
        direccionDomicilio: faker.location.streetAddress(),
        direccionTrabajo: faker.location.secondaryAddress(),
        nombreEmpresaTrabajo: faker.company.name(),
        cargoProfesion: faker.person.jobTitle(),
      },
    });

    console.log(`Persona ${i + 1} creada: ${nombre} ${apellidos}`);
  }
}

seedPersonas()
  .then(() => {
    console.log('Seed de personas finalizado');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('Error al ejecutar el seed de personas:', e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
