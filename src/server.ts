import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import cors from 'cors'; //Importar CORS
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

//Habilitar CORS para permitir solicitudes desde Netlify u otro frontend
app.use(cors({
  origin: "https://questioning.netlify.app", 
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

/**
 * Servir archivos estáticos desde la carpeta /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y', // Cachear archivos estáticos por un año
    index: false,
    redirect: false,
  }),
);

/**
 * Manejar todas las demás solicitudes renderizando la aplicación Angular
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Iniciar el servidor si este módulo es el punto de entrada principal
 * El servidor escucha en el puerto definido por la variable de entorno `PORT` o usa 4000 por defecto.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Servidor de Node Express ejecutándose en http://localhost:${port}`);
  });
}

/**
 * Manejador de solicitudes utilizado por Angular CLI (modo desarrollo y durante la construcción).
 */
export const reqHandler = createNodeRequestHandler(app);
