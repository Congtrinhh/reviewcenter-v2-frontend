import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appUrlValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UrlValidatorDirective,
      multi: true,
    },
  ],
})
export class UrlValidatorDirective implements Validator {
  constructor() {}
  validate(control: AbstractControl): { [key: string]: any } | null {
    // no value - oke
    if (!control.value) {
      return null;
    }
    // if have value, ensure that value starts with ... and ends with ...
    else if (
      control.value.startsWith('http://') ||
      control.value.startsWith('https://')
    ) {
      // if (
      //   control.value.endsWith('.jpg') ||
      //   control.value.endsWith('.jpeg') ||
      //   control.value.endsWith('.png') ||
      //   control.value.endsWith('.webm') ||
      //   control.value.endsWith('.jfif')
      // ) {
      //   return null;
      // }
      return null;
    }
    // if not in these above case, throw error
    return { urlInvalid: true };
  }
}
