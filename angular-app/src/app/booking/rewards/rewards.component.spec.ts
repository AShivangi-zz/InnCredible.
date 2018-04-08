import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { RewardsComponent } from './rewards.component';

describe('RewardsComponent', () => {
  let component: RewardsComponent;
  let fixture: ComponentFixture<RewardsComponent>;
  let de: DebugElement;

  beforeEach(async(() => {

    fixture = TestBed.createComponent(RewardsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
