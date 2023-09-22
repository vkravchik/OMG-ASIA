import { Pipe, PipeTransform } from '@angular/core';
import { Results } from './results.enum';

@Pipe({
  name: 'result',
  standalone: true
})
export class ResultPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    if (value === "0") {
      return Results.NORMAL
    }

    return Results.ERROR;
  }

}
