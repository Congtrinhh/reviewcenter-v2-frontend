import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo',
})
export class YesNoPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): boolean {
    return value == 'false' ? false : true;
  }
}
