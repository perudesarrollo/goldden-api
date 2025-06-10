import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Lista de aseguradoras y sus productos
    const aseguradoras = [
        {
            nombre: 'Vaz',
            productos: ['VAZ-VIP', 'VAZ-PLUS'],
        },
        {
            nombre: 'Liberty',
            productos: ['LIBERTY-GOLD', 'LIBERTY-BASIC'],
        },
        {
            nombre: 'Mapfre',
            productos: ['MAPFRE-TOTAL', 'MAPFRE-ESSENCIAL'],
        },
        {
            nombre: 'Seguros Sucre',
            productos: ['SUCRE-PREMIUM', 'SUCRE-ECO'],
        },
    ];

    for (const aseg of aseguradoras) {
        // Crear o reutilizar aseguradora
        const aseguradora = await prisma.aseguradora.upsert({
            where: { nombre: aseg.nombre },
            update: {},
            create: {
                nombre: aseg.nombre,
            },
        });

        for (const nombreProducto of aseg.productos) {
            // Crear el producto
            const producto = await prisma.productoSeguro.create({
                data: {
                    nombre: nombreProducto,
                    tasaBase: 0.01,
                    activo: true,
                    aseguradoraId: aseguradora.id,
                },
            });

            // Crear coberturas del producto
            await prisma.coberturaSeguro.createMany({
                data: [
                    {
                        productoId: producto.id,
                        nombre: 'Responsabilidad Civil',
                        descripcion: 'Cubre daños a terceros',
                        obligatorio: true,
                        activo: true,
                    },
                    {
                        productoId: producto.id,
                        nombre: 'Daños Propios',
                        descripcion: 'Daños al vehículo asegurado',
                        obligatorio: true,
                        activo: true,
                    },
                    {
                        productoId: producto.id,
                        nombre: 'Robo Total',
                        descripcion: 'Cubre el robo total del vehículo',
                        obligatorio: false,
                        activo: true,
                    },
                    {
                        productoId: producto.id,
                        nombre: 'Asistencia Vial',
                        descripcion: 'Servicio de asistencia en carretera 24/7',
                        obligatorio: false,
                        activo: true,
                    },
                ],
            });

            console.log(`✅ Producto ${nombreProducto} y coberturas creados para ${aseg.nombre}`);
        }
    }

    console.log('🎉 Seed completado correctamente.');
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error('❌ Error ejecutando seed:', e);
        prisma.$disconnect().finally(() => process.exit(1));
    });
