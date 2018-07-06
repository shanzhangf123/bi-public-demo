import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiCalendarComponent } from './bi-calendar.component';

describe('BiCalendarComponent', () => {
  let component: BiCalendarComponent;
  let fixture: ComponentFixture<BiCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
