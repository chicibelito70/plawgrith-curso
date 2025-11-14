import { test as base } from '@playwright/test';
import { cleanEvidenciasDir, takeScreenshot, saveDebugInfo } from '../utils/evidencias';

/**
 * Fixture personalizado que limpia evidencias y captura automáticamente en caso de fallo
 */
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    // Limpiar evidencias ANTES de la primera prueba
    if (testInfo.testId === '1') {
      cleanEvidenciasDir();
    }

    await use(page);

    // Capturar evidencias en caso de fallo
    if (testInfo.status !== 'passed') {
      console.log(`\n⚠️ Prueba fallida: ${testInfo.title}`);
      
      try {
        await takeScreenshot(page, testInfo.title, 'fail');
        await saveDebugInfo(page, testInfo.title);
      } catch (error) {
        console.error(`Error al capturar evidencias de fallo:`, error);
      }
    }
  },
});

export { expect } from '@playwright/test';
