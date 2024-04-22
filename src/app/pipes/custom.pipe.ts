import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
  standalone: true
})
export class CustomPipe implements PipeTransform {

  transform(value: string, a:number, b:number): unknown {
    return value.slice(a,b);
  }

}
