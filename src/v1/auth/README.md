src/
├── v1/
│   └── auth/                # Módulo de autenticación
│       ├── application/     # Casos de uso (lógica de la aplicación)
│       │   └── login.use-case.ts   # Lógica para manejar el inicio de sesión
│       ├── domain/          # Entidades, interfaces, reglas de dominio
│       │   ├── jwt-payload.interface.ts
│       │   └── user-profile.interface.ts
│       │   └── user.entity.ts
│       ├── infrastructure/  # Implementación de repositorios, Prisma, etc.
│       │   └── jwt.service.ts
│       ├── interfaces/
│       │   └── login.dto.ts
│       ├── controllers/
│       │   └── auth.controller.ts
│       ├── strategies/
│       │   └── jwt.strategy.ts
│       ├── auth.module.ts   # Módulo principal de Auth
│       └── auth.service.ts  # Delegación de lógica principal (servicios de autenticación)
├── common/                  # Utilidades comunes (filtros, pipes, etc.)
│   └── decorators/          # Decoradores reutilizables
├── config/                  # Configuración global (env, JWT, DB)
│   └── jwt.config.ts        # Configuración de JWT
├── main.ts                  # Punto de entrada (Bootstrap)
└── app.module.ts            # Módulo principal de la aplicación


src/
│
└───auth/
    ├───controllers/               # Controladores que gestionan las rutas de HTTP
    │   └───auth.controller.ts      # Controlador que maneja las solicitudes HTTP relacionadas con la autenticación
    ├───services/                  # Servicios que contienen la lógica de negocio
    │   └───auth.service.ts         # Lógica de la autenticación (login, verificación de token, etc.)
    ├───repositories/              # Repositorios que acceden a la base de datos
    │   └───user.repository.ts      # Repositorio de acceso a datos (e.g., usuarios en la base de datos)
    ├───interfaces/                # Interfaces para definir los contratos de los servicios y repositorios
    │   └───auth.interface.ts       # Definición de la interfaz de los servicios de autenticación
    ├───guards/                    # Guards para proteger las rutas
    │   └───jwt-auth.guard.ts       # Guardia que valida el JWT
    ├───strategies/                # Estrategias de autenticación (JWT, OAuth, etc.)
    │   └───jwt.strategy.ts         # Estrategia de autenticación basada en JWT
    ├───infrastructure/            # Implementaciones de infraestructura (e.g., JWT, envío de correos, etc.)
    │   └───jwt.service.ts          # Servicio para generar y verificar tokens JWT
    └───shared/                    # Componentes reutilizables (utils, validaciones, excepciones)
        └───logger.ts               # Servicio o utilidad de log (por ejemplo, para registrar errores)
