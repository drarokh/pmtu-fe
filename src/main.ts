import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

async function bootstrap() {
  const providers = [...(appConfig.providers ?? [])];

  await bootstrapApplication(App, { ...appConfig, providers }).catch((err) => console.error(err));
}

bootstrap();
