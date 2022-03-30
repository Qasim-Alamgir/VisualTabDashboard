import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRadiusComponent } from './show-radius.component';

describe('ShowRadiusComponent', () => {
  let component: ShowRadiusComponent;
  let fixture: ComponentFixture<ShowRadiusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRadiusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
