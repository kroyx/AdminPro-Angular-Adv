import { computed, Injectable, signal } from '@angular/core';
import { MenuItem } from '../../auth/interfaces';


@Injectable({
  providedIn: 'root',
})
export class SidebarService {

  // public menuApp!: MenuItem[];

  private _menuApp = signal<MenuItem[]>([]);
  public menuApp   = computed(() => this._menuApp());

  constructor() { }

  cargarMenu() {
    const menu = sessionStorage.getItem('menu');
    if (menu) {
      this._menuApp.set(JSON.parse(menu));
    }
  }
}
