import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceCheckerComponent } from './distance-checker.component';

describe('DistanceCheckerComponent', () => {
  let component: DistanceCheckerComponent;
  let fixture: ComponentFixture<DistanceCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanceCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
