import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCopyroghtComponent } from './footer-copyroght.component';

describe('FooterCopyroghtComponent', () => {
  let component: FooterCopyroghtComponent;
  let fixture: ComponentFixture<FooterCopyroghtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterCopyroghtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCopyroghtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
