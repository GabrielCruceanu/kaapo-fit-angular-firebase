import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {
  CLIENT_ICON,
  NUTRITION_ICON,
  TRAINER_ICON,
  WORKOUT_ICON,
} from '@/content/icons';
import { getProfilesData } from '@/data/profileData';
import { ProfileData } from '../../model/profileData.model';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent {
  profiles: ProfileData[];

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
