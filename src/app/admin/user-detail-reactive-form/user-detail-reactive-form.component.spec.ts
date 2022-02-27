import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailReactiveFormComponent } from './user-detail-reactive-form.component';

describe('UserDetailReactiveFormComponent', () => {
  let component: UserDetailReactiveFormComponent;
  let fixture: ComponentFixture<UserDetailReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailReactiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
