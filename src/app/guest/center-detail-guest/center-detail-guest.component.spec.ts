import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterDetailGuestComponent } from './center-detail-guest.component';

describe('CenterDetailGuestComponent', () => {
  let component: CenterDetailGuestComponent;
  let fixture: ComponentFixture<CenterDetailGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterDetailGuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterDetailGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
