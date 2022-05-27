import { Component } from '@angular/core';
import { getTabsData, TabModel } from './tabs.data';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {
  ADD_ICON,
  HOME_ICON,
  NUTRITION_ICON,
  PROGRESS_ICON,
  WORKOUT_ICON,
} from '@/content/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  tabs: TabModel[];

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry.addSvgIconLiteral(
      'home',
      this.domSanitizer.bypassSecurityTrustHtml(HOME_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'progress',
      this.domSanitizer.bypassSecurityTrustHtml(PROGRESS_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'add',
      this.domSanitizer.bypassSecurityTrustHtml(ADD_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'nutrition',
      this.domSanitizer.bypassSecurityTrustHtml(NUTRITION_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'workout',
      this.domSanitizer.bypassSecurityTrustHtml(WORKOUT_ICON)
    );
    this.tabs = getTabsData();
  }
}
