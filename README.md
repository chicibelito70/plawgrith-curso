# Playwright Automation Project

## Overview
Lightweight Playwright-based automation test suite for web applications. Provides a structure for writing and running end-to-end tests with Playwright Test.

## Prerequisites
- Node.js 16+ (LTS recommended)
- npm or yarn
- Git (optional)

## Installation
1. Initialize project (if not done):
    ```
    npm init -y
    ```
2. Install Playwright Test:
    ```
    npm install -D @playwright/test
    npx playwright install
    ```

(If using TypeScript, add types and config)
```
npm install -D typescript ts-node @types/node
npx playwright test --init
```

## Running tests
- Run all tests:
  ```
  npx playwright test
  ```
- Run a single file:
  ```
  npx playwright test tests/example.spec.ts
  ```
- Run headed (visual) mode:
  ```
  npx playwright test --headed
  ```
- Run with a specific browser:
  ```
  npx playwright test --project=chromium
  ```
- Show HTML report:
  ```
  npx playwright show-report
  ```

## Project structure (suggested)
- tests/               — test files (e.g., *.spec.ts or *.spec.js)
- fixtures/            — custom fixtures and test utilities
- playwright.config.js — Playwright configuration
- package.json
- README.md

## Configuration
- Edit playwright.config.js to set baseURL, timeouts, retries, projects (browsers), and reporter(s).
- Use environment variables or a .env file for secrets/URLs (do not commit secrets).

## Writing tests (example)
```ts
import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

## CI Integration
- Use the Playwright GitHub Action or run commands in your CI pipeline:
  ```
  npx playwright install --with-deps
  npx playwright test --reporter=list
  npx playwright show-report
  ```

## Troubleshooting & Tips
- Use `npx playwright test --debug` to open inspector.
- Increase timeout in config for slow environments.
- Use video/screenshots for flaky tests by enabling in config.

## Contributing
- Follow existing test patterns.
- Keep tests independent and idempotent.
- Run `npx playwright test` before submitting PRs.

## License
Add a LICENSE file describing the project license.

---

# Proyecto de automatización con Playwright (Español)

## Descripción
Suite de pruebas end-to-end ligera basada en Playwright. Estructura recomendada para crear y ejecutar tests de automatización web.

## Requisitos
- Node.js 16+ (recomendado LTS)
- npm o yarn
- Git (opcional)

## Instalación
1. Inicializar el proyecto (si hace falta):
    ```
    npm init -y
    ```
2. Instalar Playwright Test:
    ```
    npm install -D @playwright/test
    npx playwright install
    ```

(Para TypeScript)
```
npm install -D typescript ts-node @types/node
npx playwright test --init
```

## Ejecutar pruebas
- Ejecutar todas las pruebas:
  ```
  npx playwright test
  ```
- Ejecutar un archivo específico:
  ```
  npx playwright test tests/example.spec.ts
  ```
- Ejecutar en modo visual:
  ```
  npx playwright test --headed
  ```
- Ejecutar en un navegador concreto:
  ```
  npx playwright test --project=chromium
  ```
- Ver reporte HTML:
  ```
  npx playwright show-report
  ```

## Estructura sugerida
- tests/               — archivos de prueba (ej. *.spec.ts o *.spec.js)
- fixtures/            — fixtures y utilidades
- playwright.config.js — configuración de Playwright
- package.json
- README.md

## Configuración
- Edita playwright.config.js para baseURL, timeouts, retries, proyectos (navegadores) y reporteros.
- Usa variables de entorno o .env para secretos/URLs (no subir secretos al repositorio).

## Ejemplo de test
```ts
import { test, expect } from '@playwright/test';

test('la página tiene título', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

## Integración en CI
- Usa la Action oficial de Playwright o ejecuta:
  ```
  npx playwright install --with-deps
  npx playwright test --reporter=list
  npx playwright show-report
  ```

## Solución de problemas y consejos
- `npx playwright test --debug` abre el inspector.
- Aumenta timeouts en ambientes lentos.
- Habilita video/screenshot para depurar tests inestables.

## Contribuciones
- Sigue el patrón de tests existente.
- Mantén las pruebas independientes y deterministas.
- Ejecuta `npx playwright test` antes de crear PRs.

## Licencia
Añade un archivo LICENSE indicando la licencia del proyecto.