import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDetailsContainerComponent } from './user-profile-details-container.component';

describe('UserProfileDetailsContainerComponent', () => {
  let component: UserProfileDetailsContainerComponent;
  let fixture: ComponentFixture<UserProfileDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileDetailsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
