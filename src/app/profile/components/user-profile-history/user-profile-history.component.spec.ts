import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileHistoryComponent } from './user-profile-history.component';

describe('UserProfileHistoryComponent', () => {
  let component: UserProfileHistoryComponent;
  let fixture: ComponentFixture<UserProfileHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
