import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: [ './rxjs.component.css' ],
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs?: Subscription;

  constructor() {

    // this.retornaObservable()
    //   .pipe(
    //     retry(2) // En caso de error reintenta la operación el número indicado de veces
    //   )
    //   .subscribe(
    //   valor => console.log('Subs: ', valor),
    //   error => console.log('Error: ', error),
    //   () => console.log('Observable finalizado'),
    // );
    this.intervalSubs = this.retornaInterval()
      .subscribe();
  }

  ngOnDestroy(): void {
    this.intervalSubs?.unsubscribe()
  }


  retornaInterval(): Observable<number> {
    return interval(1000)
      .pipe(
        map(value => value + 1),
        filter(value => value % 2 === 0),
        take(4),
      );
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          i = 0;
          observer.error('i llegó al valor 2');
        }
      }, 1000);
    });

    return obs$;

    // obs$.pipe(
    //     retry(2) // En caso de error reintenta la operación el número indicado de veces
    //   )
    //   .subscribe(
    //   valor => console.log('Subs: ', valor),
    //   error => console.log('Error: ', error),
    //   () => console.log('Observable finalizado'),
    // );
  }
}
