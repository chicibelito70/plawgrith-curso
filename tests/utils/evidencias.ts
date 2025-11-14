import fs from 'fs';
import path from 'path';

/**
 * Ruta de la carpeta de evidencias
 */
export const EVIDENCIAS_DIR = path.resolve(__dirname, '../evidencias');

/**
 * Crear la carpeta de evidencias si no existe
 */
export function ensureEvidenciasDir(): void {
  if (!fs.existsSync(EVIDENCIAS_DIR)) {
    fs.mkdirSync(EVIDENCIAS_DIR, { recursive: true });
    console.log(`📁 Carpeta de evidencias creada: ${EVIDENCIAS_DIR}`);
  }
}

/**
 * Limpiar la carpeta de evidencias
 */
export function cleanEvidenciasDir(): void {
  try {
    if (fs.existsSync(EVIDENCIAS_DIR)) {
      const files = fs.readdirSync(EVIDENCIAS_DIR);
      
      for (const file of files) {
        const filePath = path.join(EVIDENCIAS_DIR, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // Eliminar subcarpetas recursivamente
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          // Eliminar archivos
          fs.unlinkSync(filePath);
        }
      }
      console.log(`🧹 Carpeta de evidencias limpiada`);
    }
  } catch (error) {
    console.error(`❌ Error al limpiar la carpeta de evidencias:`, error);
  }
}

/**
 * Obtener la ruta completa para guardar una captura de pantalla
 */
export function getScreenshotPath(testName: string, type: 'pass' | 'fail' | 'step' = 'step'): string {
  ensureEvidenciasDir();
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${type}_${testName}_${timestamp}.png`;
  
  return path.join(EVIDENCIAS_DIR, filename);
}

/**
 * Guardar captura de pantalla con información
 */
export async function takeScreenshot(
  page: any,
  testName: string,
  type: 'pass' | 'fail' | 'step' = 'step'
): Promise<string> {
  try {
    const screenshotPath = getScreenshotPath(testName, type);
    await page.screenshot({ 
      path: screenshotPath,
      fullPage: true 
    });
    
    const emoji = type === 'pass' ? '✅' : type === 'fail' ? '❌' : '📸';
    console.log(`${emoji} Captura guardada: ${path.basename(screenshotPath)}`);
    
    return screenshotPath;
  } catch (error) {
    console.error(`❌ Error al guardar captura de pantalla:`, error);
    throw error;
  }
}

/**
 * Guardar HTML de la página para debugging
 */
export async function savePageHTML(
  page: any,
  testName: string
): Promise<string> {
  try {
    ensureEvidenciasDir();
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `html_${testName}_${timestamp}.html`;
    const filePath = path.join(EVIDENCIAS_DIR, filename);
    
    const html = await page.content();
    fs.writeFileSync(filePath, html);
    
    console.log(`📄 HTML guardado: ${filename}`);
    return filePath;
  } catch (error) {
    console.error(`❌ Error al guardar HTML:`, error);
    throw error;
  }
}

/**
 * Obtener información de la página para debugging
 */
export async function getPageInfo(page: any): Promise<object> {
  return {
    url: page.url(),
    title: await page.title(),
    viewport: page.viewportSize(),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Guardar información de depuración
 */
export async function saveDebugInfo(
  page: any,
  testName: string
): Promise<void> {
  try {
    ensureEvidenciasDir();
    
    const pageInfo = await getPageInfo(page);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `debug_${testName}_${timestamp}.json`;
    const filePath = path.join(EVIDENCIAS_DIR, filename);
    
    fs.writeFileSync(filePath, JSON.stringify(pageInfo, null, 2));
    
    console.log(`📋 Información de debug guardada: ${filename}`);
  } catch (error) {
    console.error(`❌ Error al guardar información de debug:`, error);
  }
}

export default {
  EVIDENCIAS_DIR,
  ensureEvidenciasDir,
  cleanEvidenciasDir,
  getScreenshotPath,
  takeScreenshot,
  savePageHTML,
  getPageInfo,
  saveDebugInfo,
};
