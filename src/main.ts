import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

async function bootstrap() {
  let pokedexData: any = undefined;
  let typesData: any = undefined;
  try {
    const [pRes, tRes] = await Promise.all([
      fetch('/data/pokedex.json'),
      fetch('/data/types.json'),
    ]);
    if (pRes.ok) pokedexData = await pRes.json();
    if (tRes.ok) typesData = await tRes.json();
  } catch (e) {
    // ignore and let services fallback to HttpClient
  }

  console.debug('preload:', { pokedex: !!pokedexData, types: !!typesData });

  const providers = [...(appConfig.providers ?? [])];

  await bootstrapApplication(App, { ...appConfig, providers }).catch((err) => console.error(err));
}

bootstrap();
