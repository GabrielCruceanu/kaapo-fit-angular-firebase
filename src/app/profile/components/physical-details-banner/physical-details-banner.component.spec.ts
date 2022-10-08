import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalDetailsBannerComponent } from './physical-details-banner.component';

describe('PhysicalDetailsBannerComponent', () => {
  let component: PhysicalDetailsBannerComponent;
  let fixture: ComponentFixture<PhysicalDetailsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalDetailsBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalDetailsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
