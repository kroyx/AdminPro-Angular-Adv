import { Component, inject, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private settingsService = inject(SettingsService);

  public year: number = new Date().getFullYear();

}
