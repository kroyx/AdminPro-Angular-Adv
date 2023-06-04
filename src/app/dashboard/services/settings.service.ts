import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  private _linkTheme = document.querySelector('#theme');

  constructor() {
    this.setInitTheme();
  }

  private setInitTheme() {
    if (!this._linkTheme) return;

    const data = localStorage.getItem('theme');
    if (!data) return;

    const url = `./assets/css/colors/${data}.css`;
    this._linkTheme.setAttribute('href', url);
  }

  changeTheme(theme: string, links: NodeListOf<Element>) {
    if (!this._linkTheme) return;

    const url = `./assets/css/colors/${theme}.css`;
    this._linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', theme);

    this.checkCurrentTheme(links);
  }

  checkCurrentTheme(links: NodeListOf<Element>) {
    if (!this._linkTheme) return;

    links = document.querySelectorAll('.selector');
    if (!links) return;

    const theme = localStorage.getItem('theme');
    if (!theme) return;

    links.forEach(elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');

      if (btnTheme === theme) {
        elem.classList.add('working');
      }
    });
  }
}
