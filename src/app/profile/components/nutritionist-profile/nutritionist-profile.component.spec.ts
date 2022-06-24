import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistProfileComponent } from './nutritionist-profile.component';

describe('NutritionistProfileComponent', () => {
  let component: NutritionistProfileComponent;
  let fixture: ComponentFixture<NutritionistProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionistProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
