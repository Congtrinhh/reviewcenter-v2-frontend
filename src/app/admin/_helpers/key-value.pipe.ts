import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue',
})
export class KeyValuePipe implements PipeTransform {
  transform(value: {}, ...args: unknown[]): string[] {
    if (!value) {
      return [];
    }

    return Object.keys(value);
  }
}
