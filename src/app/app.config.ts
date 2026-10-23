import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MY_TOKEN } from './core/tokens/app-config.token';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { languageInterceptor } from './core/interceptors/language/language.interceptor';
import { LanguageSwitcherService } from './shared/components/language-switcher/services/language-switcher.service';


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
            withInterceptors([authInterceptor, languageInterceptor]),
        ),
        provideAppInitializer(() => inject(LanguageSwitcherService).initLanguage()),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: 'dark',
                }
            }
        }),
        provideTranslateService({
            loader: provideTranslateHttpLoader({
                prefix: './assets/i18n/',
                suffix: '.json'
            }),
        }),
        {
            provide: MY_TOKEN,
            useValue: 'https://fitness.elevateegy.com/api/v1'
        }
    ]
};
