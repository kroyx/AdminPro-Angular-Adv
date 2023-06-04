import { Injectable } from '@angular/core';

export interface MenuItem {
  title: string;
  icon?: string;
  url?: string;
  submenu?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menuApp: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Main', url: './'},
        {title: 'ProgressBar', url: 'progress'},
        {title: 'Gráficas', url: 'grafica1'},
      ]
    }
  ];

  constructor() { }
}
