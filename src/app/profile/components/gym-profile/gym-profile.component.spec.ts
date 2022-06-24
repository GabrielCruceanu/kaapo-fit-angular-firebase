import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymProfileComponent } from './gym-profile.component';

describe('GymProfileComponent', () => {
  let component: GymProfileComponent;
  let fixture: ComponentFixture<GymProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
