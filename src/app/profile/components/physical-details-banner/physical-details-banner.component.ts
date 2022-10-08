import { Component, Input } from '@angular/core';
import { ClientPhysicalDetails } from '@/app/profile/model/clientProfile.model';

@Component({
  selector: 'physical-details-banner',
  templateUrl: './physical-details-banner.component.html',
  styleUrls: ['./physical-details-banner.component.scss'],
})
export class PhysicalDetailsBannerComponent {
  @Input()
  currentPhysicalDetails: ClientPhysicalDetails;

  public currentDay: number;
  public currentMonth: number;
  public currentYear: number;

  constructor() {
    this.currentDay = new Date().getUTCDate();
    this.currentMonth = new Date().getUTCMonth() + 1;
    this.currentYear = new Date().getUTCFullYear();
  }
}
