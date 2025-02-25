import { bootstrapApplication } from '@angular/platform-browser';
import { getPlatform } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Si ya existe una plataforma creada (por ejemplo, en SSR o un arranque anterior), la destruimos
const platform = getPlatform();
if (platform) {
  platform.destroy();
}

// Arrancamos la aplicación utilizando la configuración centralizada (appConfig)
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
