import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfessionalProfileComponent } from './add-professional-profile.component';

describe('AddProfessionalProfileComponent', () => {
  let component: AddProfessionalProfileComponent;
  let fixture: ComponentFixture<AddProfessionalProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfessionalProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfessionalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
