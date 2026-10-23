import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageSwitcherService } from '../../../shared/components/language-switcher/services/language-switcher.service';
import { MY_TOKEN } from '../../tokens/app-config.token';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const api = inject(MY_TOKEN);
  if (!req.url.startsWith(api)) return next(req);

  const lang = inject(LanguageSwitcherService).currentLang();
  return next(req.clone({ setHeaders: { 'Accept-Language': lang } }));
};
