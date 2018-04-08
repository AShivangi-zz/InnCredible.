import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let de: DebugElement;

  beforeEach(async(() => {

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
}));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
