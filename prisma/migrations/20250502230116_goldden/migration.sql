-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `nombreCompleto` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMIN', 'VENDEDOR', 'ANALISTA', 'CLIENTE', 'SOPORTE') NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `ultimoAcceso` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Usuario_username_key`(`username`),
    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SesionUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFin` DATETIME(3) NULL,
    `ipAddress` VARCHAR(191) NOT NULL,
    `userAgent` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditoriaAccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modelo` VARCHAR(191) NOT NULL,
    `accion` ENUM('CREATE', 'UPDATE', 'DELETE', 'VIEW', 'LOGIN', 'LOGOUT') NOT NULL,
    `entidadId` VARCHAR(191) NOT NULL,
    `datosAnteriores` VARCHAR(191) NULL,
    `datosNuevos` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `codigoISO` VARCHAR(191) NOT NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Pais_codigoISO_key`(`codigoISO`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provincia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `paisId` INTEGER NOT NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ciudad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `provinciaId` INTEGER NOT NULL,
    `codigoPostal` VARCHAR(191) NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Persona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoPersona` ENUM('N', 'J') NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `numeroDocumento` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `ciudadId` INTEGER NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `contratante` BOOLEAN NOT NULL,
    `genero` ENUM('MASCULINO', 'FEMENINO') NOT NULL,
    `estadoCivil` ENUM('S', 'C', 'D', 'V', 'U', 'SP', 'O') NOT NULL,
    `nombreConyugue` VARCHAR(191) NULL,
    `ciConyugue` VARCHAR(191) NULL,
    `activos` DOUBLE NOT NULL,
    `pasivos` DOUBLE NOT NULL,
    `ingresos` DOUBLE NOT NULL,
    `egresos` DOUBLE NOT NULL,
    `direccionDomicilio` VARCHAR(191) NOT NULL,
    `direccionTrabajo` VARCHAR(191) NOT NULL,
    `nombreEmpresaTrabajo` VARCHAR(191) NOT NULL,
    `cargoProfesion` VARCHAR(191) NOT NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Persona_numeroDocumento_key`(`numeroDocumento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonaContratante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personaId` INTEGER NOT NULL,
    `parentescoId` INTEGER NOT NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `PersonaContratante_personaId_key`(`personaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parentesco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Parentesco_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personaId` INTEGER NOT NULL,
    `fechaAlta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vendedorId` INTEGER NOT NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Cliente_personaId_key`(`personaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `fechaIngreso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nivelComisionId` INTEGER NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Vendedor_usuarioId_key`(`usuarioId`),
    UNIQUE INDEX `Vendedor_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cotizacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leadId` INTEGER NOT NULL,
    `estado` ENUM('PENDIENTE', 'ACEPTADA', 'RECHAZADA', 'EXPIRADA') NOT NULL,
    `fechaCotizacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaExpiracion` DATETIME(3) NOT NULL,
    `aseguradora` VARCHAR(191) NOT NULL,
    `renovacionAuto` BOOLEAN NOT NULL DEFAULT false,
    `tipoSeguro` ENUM('VEHICULAR', 'SALUD', 'GENERALES') NOT NULL,
    `vendedorId` INTEGER NOT NULL,
    `clienteId` INTEGER NULL,
    `primaTotal` DOUBLE NOT NULL,
    `primaNeta` DOUBLE NOT NULL,
    `impuestos` DOUBLE NOT NULL,
    `comision` DOUBLE NOT NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cotizacionId` INTEGER NOT NULL,
    `placa` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `anio` INTEGER NOT NULL,
    `valorAsegurado` DOUBLE NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `numeroChassis` VARCHAR(191) NOT NULL,
    `numeroMotor` VARCHAR(191) NOT NULL,
    `uso` VARCHAR(191) NOT NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeguroSalud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cotizacionId` INTEGER NOT NULL,
    `planSalud` VARCHAR(191) NOT NULL,
    `coberturaHospitalaria` BOOLEAN NOT NULL,
    `coberturaAmbulatorial` BOOLEAN NOT NULL,
    `coberturaMedicamentos` BOOLEAN NOT NULL,
    `preexistencias` VARCHAR(191) NULL,
    `limiteCovertura` DOUBLE NOT NULL,
    `deducible` DOUBLE NOT NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `SeguroSalud_cotizacionId_key`(`cotizacionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BeneficiarioSalud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seguroSaludId` INTEGER NOT NULL,
    `personaId` INTEGER NOT NULL,
    `parentescoId` INTEGER NOT NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeguroGeneral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cotizacionId` INTEGER NOT NULL,
    `tipoRiesgo` VARCHAR(191) NOT NULL,
    `descripcionRiesgo` VARCHAR(191) NOT NULL,
    `ubicacionRiesgo` VARCHAR(191) NULL,
    `valorAsegurado` DOUBLE NOT NULL,
    `deducible` DOUBLE NOT NULL,
    `coberturasEspeciales` VARCHAR(191) NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `SeguroGeneral_cotizacionId_key`(`cotizacionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cotizacionId` INTEGER NOT NULL,
    `metodoPago` ENUM('CONTADO', 'TARJETA_CREDITO', 'FINANCIADO') NOT NULL,
    `monto` DOUBLE NOT NULL,
    `descuento` DOUBLE NOT NULL DEFAULT 0.0,
    `pagadorId` INTEGER NOT NULL,
    `fechaPago` DATETIME(3) NOT NULL,
    `comprobante` VARCHAR(191) NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personaId` INTEGER NOT NULL,
    `parentescoId` INTEGER NULL,
    `tipo` ENUM('LEAD', 'TERCERO') NOT NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Poliza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cotizacionId` INTEGER NOT NULL,
    `numeroPoliza` VARCHAR(191) NOT NULL,
    `fechaEmision` DATETIME(3) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `estadoPoliza` ENUM('VIGENTE', 'VENCIDA', 'CANCELADA', 'SUSPENDIDA') NOT NULL,
    `primaTotal` DOUBLE NOT NULL,
    `primaNeta` DOUBLE NOT NULL,
    `impuestos` DOUBLE NOT NULL,
    `comision` DOUBLE NOT NULL,
    `rutaDocumento` VARCHAR(191) NULL,
    `versionActual` INTEGER NOT NULL DEFAULT 1,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Poliza_cotizacionId_key`(`cotizacionId`),
    UNIQUE INDEX `Poliza_numeroPoliza_key`(`numeroPoliza`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialPoliza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `polizaId` INTEGER NOT NULL,
    `tipoEvento` ENUM('EMISION', 'RENOVACION', 'MODIFICACION', 'CANCELACION', 'SUSPENSION', 'REACTIVACION', 'ANULACION', 'ENDOSO', 'CAMBIO_BENEFICIARIOS', 'CAMBIO_COBERTURAS', 'CAMBIO_PRIMA') NOT NULL,
    `fechaEvento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `descripcion` VARCHAR(191) NOT NULL,
    `valorAnterior` VARCHAR(191) NULL,
    `valorNuevo` VARCHAR(191) NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VersionPoliza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `polizaId` INTEGER NOT NULL,
    `numeroVersion` INTEGER NOT NULL,
    `fechaVersion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `motivo` VARCHAR(191) NOT NULL,
    `rutaDocumento` VARCHAR(191) NULL,
    `primaTotal` DOUBLE NOT NULL,
    `primaNeta` DOUBLE NOT NULL,
    `impuestos` DOUBLE NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CambioCoberturaPoliza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `versionPolizaId` INTEGER NOT NULL,
    `nombreCobertura` VARCHAR(191) NOT NULL,
    `valorAnterior` DOUBLE NULL,
    `valorNuevo` DOUBLE NULL,
    `incluidaAnterior` BOOLEAN NULL,
    `incluidaNuevo` BOOLEAN NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endoso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `polizaId` INTEGER NOT NULL,
    `numeroEndoso` INTEGER NOT NULL,
    `tipoEndoso` ENUM('INCLUSION', 'EXCLUSION', 'MODIFICACION', 'ACLARACION') NOT NULL,
    `fechaEndoso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `descripcion` VARCHAR(191) NOT NULL,
    `impactoValor` DOUBLE NOT NULL,
    `rutaDocumento` VARCHAR(191) NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Renovacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `polizaAnteriorId` INTEGER NOT NULL,
    `polizaId` INTEGER NOT NULL,
    `fechaSolicitud` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaVencimiento` DATETIME(3) NOT NULL,
    `estado` ENUM('PENDIENTE', 'ENVIADA', 'ACEPTADA', 'RECHAZADA', 'VENCIDA') NOT NULL DEFAULT 'PENDIENTE',
    `observaciones` VARCHAR(191) NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Siniestro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `polizaId` INTEGER NOT NULL,
    `numeroSiniestro` VARCHAR(191) NOT NULL,
    `fechaOcurrencia` DATETIME(3) NOT NULL,
    `fechaReporte` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `descripcion` VARCHAR(191) NOT NULL,
    `lugarOcurrencia` VARCHAR(191) NOT NULL,
    `montoReclamado` DOUBLE NULL,
    `montoAprobado` DOUBLE NULL,
    `estado` ENUM('REPORTADO', 'EN_EVALUACION', 'APROBADO', 'RECHAZADO', 'PAGADO', 'CERRADO') NOT NULL DEFAULT 'REPORTADO',
    `observaciones` VARCHAR(191) NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Siniestro_numeroSiniestro_key`(`numeroSiniestro`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siniestroId` INTEGER NOT NULL,
    `tipoDocumento` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `rutaArchivo` VARCHAR(191) NOT NULL,
    `fechaCarga` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `descripcion` VARCHAR(191) NULL,
    `auditoriaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SesionUsuario` ADD CONSTRAINT `SesionUsuario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditoriaAccion` ADD CONSTRAINT `AuditoriaAccion_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pais` ADD CONSTRAINT `Pais_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Provincia` ADD CONSTRAINT `Provincia_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `Pais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Provincia` ADD CONSTRAINT `Provincia_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ciudad` ADD CONSTRAINT `Ciudad_provinciaId_fkey` FOREIGN KEY (`provinciaId`) REFERENCES `Provincia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ciudad` ADD CONSTRAINT `Ciudad_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Persona` ADD CONSTRAINT `Persona_ciudadId_fkey` FOREIGN KEY (`ciudadId`) REFERENCES `Ciudad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Persona` ADD CONSTRAINT `Persona_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonaContratante` ADD CONSTRAINT `PersonaContratante_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonaContratante` ADD CONSTRAINT `PersonaContratante_parentescoId_fkey` FOREIGN KEY (`parentescoId`) REFERENCES `Parentesco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonaContratante` ADD CONSTRAINT `PersonaContratante_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parentesco` ADD CONSTRAINT `Parentesco_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `Vendedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendedor` ADD CONSTRAINT `Vendedor_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendedor` ADD CONSTRAINT `Vendedor_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cotizacion` ADD CONSTRAINT `Cotizacion_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cotizacion` ADD CONSTRAINT `Cotizacion_vendedorId_fkey` FOREIGN KEY (`vendedorId`) REFERENCES `Vendedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cotizacion` ADD CONSTRAINT `Cotizacion_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cotizacion` ADD CONSTRAINT `Cotizacion_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehiculo` ADD CONSTRAINT `Vehiculo_cotizacionId_fkey` FOREIGN KEY (`cotizacionId`) REFERENCES `Cotizacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehiculo` ADD CONSTRAINT `Vehiculo_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeguroSalud` ADD CONSTRAINT `SeguroSalud_cotizacionId_fkey` FOREIGN KEY (`cotizacionId`) REFERENCES `Cotizacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeguroSalud` ADD CONSTRAINT `SeguroSalud_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BeneficiarioSalud` ADD CONSTRAINT `BeneficiarioSalud_seguroSaludId_fkey` FOREIGN KEY (`seguroSaludId`) REFERENCES `SeguroSalud`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BeneficiarioSalud` ADD CONSTRAINT `BeneficiarioSalud_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BeneficiarioSalud` ADD CONSTRAINT `BeneficiarioSalud_parentescoId_fkey` FOREIGN KEY (`parentescoId`) REFERENCES `Parentesco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BeneficiarioSalud` ADD CONSTRAINT `BeneficiarioSalud_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeguroGeneral` ADD CONSTRAINT `SeguroGeneral_cotizacionId_fkey` FOREIGN KEY (`cotizacionId`) REFERENCES `Cotizacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeguroGeneral` ADD CONSTRAINT `SeguroGeneral_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_cotizacionId_fkey` FOREIGN KEY (`cotizacionId`) REFERENCES `Cotizacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_pagadorId_fkey` FOREIGN KEY (`pagadorId`) REFERENCES `Pagador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagador` ADD CONSTRAINT `Pagador_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagador` ADD CONSTRAINT `Pagador_parentescoId_fkey` FOREIGN KEY (`parentescoId`) REFERENCES `Parentesco`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagador` ADD CONSTRAINT `Pagador_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Poliza` ADD CONSTRAINT `Poliza_cotizacionId_fkey` FOREIGN KEY (`cotizacionId`) REFERENCES `Cotizacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Poliza` ADD CONSTRAINT `Poliza_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialPoliza` ADD CONSTRAINT `HistorialPoliza_polizaId_fkey` FOREIGN KEY (`polizaId`) REFERENCES `Poliza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialPoliza` ADD CONSTRAINT `HistorialPoliza_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VersionPoliza` ADD CONSTRAINT `VersionPoliza_polizaId_fkey` FOREIGN KEY (`polizaId`) REFERENCES `Poliza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VersionPoliza` ADD CONSTRAINT `VersionPoliza_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CambioCoberturaPoliza` ADD CONSTRAINT `CambioCoberturaPoliza_versionPolizaId_fkey` FOREIGN KEY (`versionPolizaId`) REFERENCES `VersionPoliza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CambioCoberturaPoliza` ADD CONSTRAINT `CambioCoberturaPoliza_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endoso` ADD CONSTRAINT `Endoso_polizaId_fkey` FOREIGN KEY (`polizaId`) REFERENCES `Poliza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endoso` ADD CONSTRAINT `Endoso_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Renovacion` ADD CONSTRAINT `Renovacion_polizaId_fkey` FOREIGN KEY (`polizaId`) REFERENCES `Poliza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Renovacion` ADD CONSTRAINT `Renovacion_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Siniestro` ADD CONSTRAINT `Siniestro_polizaId_fkey` FOREIGN KEY (`polizaId`) REFERENCES `Poliza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Siniestro` ADD CONSTRAINT `Siniestro_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_siniestroId_fkey` FOREIGN KEY (`siniestroId`) REFERENCES `Siniestro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_auditoriaId_fkey` FOREIGN KEY (`auditoriaId`) REFERENCES `AuditoriaAccion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
