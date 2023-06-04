import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public router = inject(Router);

  logout(): void {
    this.router.navigateByUrl('/login');
  }
}
