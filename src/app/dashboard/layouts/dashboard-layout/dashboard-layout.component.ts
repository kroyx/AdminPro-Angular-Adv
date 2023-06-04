import { Component, inject, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

declare function customInitFunctions(): void;

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  private settingsService = inject(SettingsService);

  public year: number = new Date().getFullYear();

  ngOnInit(): void {
    customInitFunctions();
  }

}
