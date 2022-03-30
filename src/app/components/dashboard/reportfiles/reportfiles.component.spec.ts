import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportfilesComponent } from './reportfiles.component';

describe('ReportfilesComponent', () => {
  let component: ReportfilesComponent;
  let fixture: ComponentFixture<ReportfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
