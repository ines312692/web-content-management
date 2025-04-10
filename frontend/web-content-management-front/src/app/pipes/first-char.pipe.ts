import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'firstChar'
})
export class FirstCharPipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.charAt(0).toUpperCase() : '';
  }
}
