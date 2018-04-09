import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { ErrDisplayComponent } from './err-display.component';

describe('ErrDisplayComponent', () => {
  let component: ErrDisplayComponent;
  let fixture: ComponentFixture<ErrDisplayComponent>;
  let de: DebugElement;

  beforeEach(async(() => {

   fixture = TestBed.createComponent(ErrDisplayComponent);

    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
