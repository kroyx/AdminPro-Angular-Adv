import { Component, inject, OnDestroy } from '@angular/core';
import { ActivationEnd, Data, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy{

  private router = inject(Router);

  public titulo!: string;
  public tituloSubs$!: Subscription;

  constructor() {
    this.tituloSubs$ = this.getDataRuta()
      .subscribe(({ titulo }) => {
        this.titulo = titulo;
      });
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getDataRuta(): Observable<Data> {
    return this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        map(event => event as ActivationEnd),
        filter(event => event.snapshot.firstChild === null),
        map(event => event.snapshot.data),
      );
  }
}
