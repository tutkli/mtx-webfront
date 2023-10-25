import { fromEvent, Observable, tap } from 'rxjs';
import { ChangeDetectorRef, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export function rxHostListener<T extends Event>(event: string): Observable<T> {
  const cdr = inject(ChangeDetectorRef);

  return fromEvent<T>(inject(ElementRef).nativeElement, event).pipe(
    tap(() => cdr.markForCheck()),
    takeUntilDestroyed()
  );
}
