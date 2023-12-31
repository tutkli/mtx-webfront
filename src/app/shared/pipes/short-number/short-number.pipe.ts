import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumber',
  standalone: true,
})
export class ShortNumberPipe implements PipeTransform {
  transform(value: number | undefined): unknown {
    if (value === null || value === undefined || value === 0) return 0;
    let abs = Math.abs(value);
    const rounder = Math.pow(10, 1);
    const isNegative = value < 0;
    let key = '';

    const powers = [
      { key: 'Q', value: Math.pow(10, 15) },
      { key: 'T', value: Math.pow(10, 12) },
      { key: 'B', value: Math.pow(10, 9) },
      { key: 'M', value: Math.pow(10, 6) },
      { key: 'K', value: 1000 },
    ];

    for (const element of powers) {
      let reduced = abs / element.value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = element.key;
        break;
      }
    }
    return (isNegative ? '-' : '') + abs + key;
  }
}
