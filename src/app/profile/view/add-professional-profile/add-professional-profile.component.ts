import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-add-professional-profile',
  templateUrl: './add-professional-profile.component.html',
  styleUrls: ['./add-professional-profile.component.scss'],
})
export class AddProfessionalProfileComponent implements OnInit {
  professionalType?: string;
  params?: Params;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(filter((params) => params['mode']))
      .subscribe((params) => {
        console.log('params', params);
        this.professionalType = params['mode'];
        this.params = params;
      });
  }
}
