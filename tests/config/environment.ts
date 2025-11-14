import dotenv from 'dotenv';
import path from 'path';

/**
 * Cargar variables de entorno según el ambiente especificado
 */
export function loadEnvironment(environment?: string) {
  const env = environment || process.env.ENVIRONMENT || 'dev';
  const envFile = path.resolve(__dirname, `../../.env.${env}`);
  
  dotenv.config({ path: envFile });
}

/**
 * Obtener la configuración del ambiente actual
 */
export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  environment: process.env.ENVIRONMENT || 'dev',
  headless: process.env.HEADLESS === 'true',
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
};

export default config;
