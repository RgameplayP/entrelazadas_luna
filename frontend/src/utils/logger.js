// Modo de desarrollo o producción
const isDevelopment = import.meta.env.MODE === 'development';
const enableLogs = import.meta.env.VITE_ENABLE_LOGS === 'true';

export const logger = {
  log: (...args) => {
    if (isDevelopment && enableLogs) {
      console.log(...args);
    }
  },
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args);
    } else {
      // En producción, podrías enviar a un servicio como Sentry
      // fetch('/api/log-error', { method: 'POST', body: JSON.stringify({ error: args }) });
    }
  },
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  info: (...args) => {
    if (isDevelopment && enableLogs) {
      console.info(...args);
    }
  },
  table: (data) => {
    if (isDevelopment && enableLogs) {
      console.table(data);
    }
  }
};