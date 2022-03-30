import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EemployeereportdetailComponent } from './eemployeereportdetail.component';

describe('EemployeereportdetailComponent', () => {
  let component: EemployeereportdetailComponent;
  let fixture: ComponentFixture<EemployeereportdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EemployeereportdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EemployeereportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
