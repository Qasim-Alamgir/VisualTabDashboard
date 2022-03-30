import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnoffsiteComponent } from './onoffsite.component';

describe('OnoffsiteComponent', () => {
  let component: OnoffsiteComponent;
  let fixture: ComponentFixture<OnoffsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnoffsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnoffsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
