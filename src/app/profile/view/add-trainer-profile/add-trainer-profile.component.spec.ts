import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainerProfileComponent } from './add-trainer-profile.component';

describe('AddProfessionalProfileComponent', () => {
  let component: AddTrainerProfileComponent;
  let fixture: ComponentFixture<AddTrainerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTrainerProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
