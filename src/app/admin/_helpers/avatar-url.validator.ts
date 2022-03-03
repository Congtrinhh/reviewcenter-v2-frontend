import { AbstractControl } from '@angular/forms';

export function AvatarUrlValidator(control: AbstractControl) {
  if (!control.value) {
    return null;
  }
  if (
    control.value.startsWith('http://') ||
    control.value.startsWith('https://')
  ) {
    return null;
  }
  return {
    invalidAvatarUrl: true,
  };
}
