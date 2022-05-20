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
import { getProfilesData } from '../../../../data/profileData';
import { ProfileData } from '../../model/profileData.model';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent implements OnInit {
  profiles: ProfileData[];

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private profileService: ProfileService,
    private router: Router
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

  ngOnInit() {
    if (this.profileService.checkIfUserHasProfile()) {
      this.router.navigate(['/profile']);
    }
  }
}
