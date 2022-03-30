import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRadiusComponent } from './add-radius.component';

describe('AddRadiusComponent', () => {
  let component: AddRadiusComponent;
  let fixture: ComponentFixture<AddRadiusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRadiusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
