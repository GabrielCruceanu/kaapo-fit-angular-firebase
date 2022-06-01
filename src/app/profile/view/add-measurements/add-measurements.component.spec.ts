import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeasurementsComponent } from './add-measurements.component';

describe('AddMeasurementsComponent', () => {
  let component: AddMeasurementsComponent;
  let fixture: ComponentFixture<AddMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeasurementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
