import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'result',
  standalone: true
})
export class ResultPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    if (value === "0") {
      return "Normal"
    }

    return "Error";
  }

}
