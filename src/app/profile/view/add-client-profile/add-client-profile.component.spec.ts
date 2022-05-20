import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientProfileComponent } from './add-client-profile.component';

describe('AddClientProfileComponent', () => {
  let component: AddClientProfileComponent;
  let fixture: ComponentFixture<AddClientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
