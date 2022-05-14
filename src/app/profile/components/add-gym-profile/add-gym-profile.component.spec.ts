import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGymProfileComponent } from './add-gym-profile.component';

describe('AddGymProfileComponent', () => {
  let component: AddGymProfileComponent;
  let fixture: ComponentFixture<AddGymProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGymProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGymProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
