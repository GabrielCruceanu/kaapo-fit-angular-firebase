import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistComponent } from './add-nutritionist-profile.component';

describe('NutritionistComponent', () => {
  let component: NutritionistComponent;
  let fixture: ComponentFixture<NutritionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutritionistComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
