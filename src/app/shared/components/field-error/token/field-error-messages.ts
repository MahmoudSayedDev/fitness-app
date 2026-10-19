import { TranslateService } from '@ngx-translate/core';
import { FieldErrorMessages } from '../types/field-error.types';

export function createDefaultFieldErrorMessages(translate: TranslateService): FieldErrorMessages {
  return {
    required: (_e, label) => translate.instant('common.validation.required', {
      label: label || translate.instant('common.validation.defaultLabel'),
    }),

    requiredTrue: (_e, label) => translate.instant('common.validation.requiredTrue', {
      label: label?.toLowerCase() ||
        translate.instant('common.validation.defaultAcceptLabel'),
    }),

    email: (_e, label) => translate.instant('common.validation.email', {
      label: label?.toLowerCase() ||
        translate.instant('common.validation.defaultEmailLabel'),
    }),

    minlength: (e, label) => translate.instant('common.validation.minlength', {
      label: label || translate.instant('common.validation.defaultLabel'),
      requiredLength: e.requiredLength,
      actualLength: e.actualLength,
    }),

    maxlength: (e, label) => translate.instant('common.validation.maxlength', {
      label: label || translate.instant('common.validation.defaultLabel'),
      requiredLength: e.requiredLength,
    }),

    min: (e, label) => translate.instant('common.validation.min', {
      label: label || translate.instant('common.validation.defaultLabel'),
      min: e.min,
    }),

    max: (e, label) => translate.instant('common.validation.max', {
      label: label || translate.instant('common.validation.defaultLabel'),
      max: e.max,
    }),

    pattern: (_e, label) => translate.instant('common.validation.pattern', {
      label: label?.toLowerCase() ||
        translate.instant('common.validation.defaultLabel'),
    }),
  };
}