import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProContainerComponent } from './pro-container.component';

describe('ProContainerComponent', () => {
  let component: ProContainerComponent;
  let fixture: ComponentFixture<ProContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
