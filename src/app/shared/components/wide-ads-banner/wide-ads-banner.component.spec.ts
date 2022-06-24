import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WideAdsBannerComponent } from './wide-ads-banner.component';

describe('WideAdsBannerComponent', () => {
  let component: WideAdsBannerComponent;
  let fixture: ComponentFixture<WideAdsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WideAdsBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WideAdsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
