import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {
  ADD_ICON,
  CLIENT_ICON,
  NUTRITION_ICON,
  PROGRESS_ICON,
  TRAINER_ICON,
  WORKOUT_ICON,
} from '../../../../content/icons';
import { getProfilesData, ProfileModel } from './profile.data';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent {
  profiles: ProfileModel[];

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry.addSvgIconLiteral(
      'client',
      this.domSanitizer.bypassSecurityTrustHtml(CLIENT_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'nutrition',
      this.domSanitizer.bypassSecurityTrustHtml(NUTRITION_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'trainer',
      this.domSanitizer.bypassSecurityTrustHtml(TRAINER_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'workout',
      this.domSanitizer.bypassSecurityTrustHtml(WORKOUT_ICON)
    );

    this.profiles = getProfilesData();
  }
}
