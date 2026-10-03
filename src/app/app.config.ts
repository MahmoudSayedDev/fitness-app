import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MY_TOKEN } from './core/tokens/app-config.token';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';


export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideAnimations(),
        provideRouter(
            routes,
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled'
            })
        ),
        provideClientHydration(),
        provideHttpClient(
            withFetch(),
            withInterceptors([authInterceptor]),
        ),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: 'dark',
                }
            }
        }),
        {
            provide: MY_TOKEN,
            useValue: 'https://fitness.elevateegy.com/api/v1'
        }
    ]
};
