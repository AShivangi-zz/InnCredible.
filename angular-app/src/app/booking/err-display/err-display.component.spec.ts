import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrDisplayComponent } from './err-display.component';

describe('ErrDisplayComponent', () => {
  let component: ErrDisplayComponent;
  let fixture: ComponentFixture<ErrDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
