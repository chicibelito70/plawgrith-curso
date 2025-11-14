# Guía de Uso de Variables de Entorno y Usuarios

## Estructura de Configuración

### 1. Variables de Entorno (.env)

Se han creado archivos de configuración para diferentes ambientes:

- `.env` - Configuración por defecto
- `.env.dev` - Configuración para ambiente de desarrollo
- `.env.qa` - Configuración para ambiente de QA

**Variables disponibles:**
```
BASE_URL=https://www.saucedemo.com    # URL base de la aplicación
ENVIRONMENT=dev                        # Ambiente actual (dev, qa)
HEADLESS=true                          # Ejecutar en modo headless
TIMEOUT=30000                          # Timeout en milisegundos
```

### 2. Archivo de Usuarios

Ubicación: `tests/fixtures/users.json`

Estructura:
```json
{
  "users": [
    {
      "username": "standard_user",
      "password": "secret_sauce",
      "role": "standard"
    }
  ],
  "invalidCredentials": {
    "username": "invalid_user",
    "password": "invalid_password"
  }
}
```

## Ejecutar Pruebas por Ambiente

### Ambiente DEV (por defecto)
```bash
npx playwright test
# o explícitamente:
set ENVIRONMENT=dev && npx playwright test
```

### Ambiente QA
```bash
set ENVIRONMENT=qa && npx playwright test
```

### Prueba específica
```bash
npx playwright test login.spec.ts
```

### Modo debug
```bash
npx playwright test --debug
```

## Uso en los Tests

### Importar configuración
```typescript
import { config } from './config/environment';
import { getUser, getAllUsers, getInvalidCredentials } from './config/users';

// Usar configuración
console.log(config.baseUrl);      // https://www.saucedemo.com
console.log(config.environment);  // dev
console.log(config.timeout);      // 30000
```

### Obtener usuarios
```typescript
// Un usuario específico
const user = getUser('standard_user');

// Todos los usuarios
const users = getAllUsers();

// Usuarios por rol
const standardUsers = getUsersByRole('standard');

// Credenciales inválidas
const invalid = getInvalidCredentials();
```

### Ejemplo completo
```typescript
test('login test', async ({ page }) => {
  const user = getUser('standard_user');
  
  await page.goto(config.baseUrl);
  
  const login = new LoginPage(page);
  await login.logincredenciales(user.username, user.password);
  await login.clickLoginButton();
  
  console.log(`✅ Login exitoso para ${user.username}`);
});
```

## Añadir Nuevos Usuarios

1. Editar `tests/fixtures/users.json`
2. Agregar nuevo objeto en el array `users`:
```json
{
  "username": "nuevo_usuario",
  "password": "su_contraseña",
  "role": "su_rol"
}
```

## Estructura de Archivos

```
playwright/
├── .env                          # Configuración por defecto
├── .env.dev                      # Configuración DEV
├── .env.qa                       # Configuración QA
├── tests/
│   ├── config/
│   │   ├── environment.ts        # Gestión de variables de entorno
│   │   └── users.ts             # Gestión de usuarios
│   ├── fixtures/
│   │   └── users.json           # Base de datos de usuarios
│   ├── pages/
│   │   └── loginPage.ts
│   └── login.spec.ts
└── playwright.config.ts
```

## Notas Importantes

- Las variables de entorno se cargan automáticamente al iniciar las pruebas
- El archivo `.env` sirve como fallback si no existe el archivo específico del ambiente
- Los usuarios se cargan desde el archivo JSON en tiempo de ejecución
- Se pueden agregar más ambientes creando nuevos archivos `.env.{ambiente}`
