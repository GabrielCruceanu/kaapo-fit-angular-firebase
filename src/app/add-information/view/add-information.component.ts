import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {
  CLIENT_ICON,
  NUTRITION_ICON,
  TRAINER_ICON,
  WORKOUT_ICON,
} from '@/content/icons';
import { getProfilesData } from '@/app/profile/data/profileData';
import { ProfileData } from '@/app/profile/model/profileData.model';
import { getAddInfoData } from '@/app/add-information/data/addInfoData';
import { AddInfoDataModel } from '@/app/add-information/model/addInfoData.model';

@Component({
  selector: 'app-add-information',
  templateUrl: './add-information.component.html',
  styleUrls: ['./add-information.component.scss'],
})
export class AddInformationComponent implements OnInit {
  addInfoData: AddInfoDataModel[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;

  constructor(
    private _formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: '',
    });
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

    this.addInfoData = getAddInfoData();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: '',
    });
  }
}
