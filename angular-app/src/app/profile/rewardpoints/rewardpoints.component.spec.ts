import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardpointsComponent } from './rewardpoints.component';

describe('RewardpointsComponent', () => {
  let component: RewardpointsComponent;
  let fixture: ComponentFixture<RewardpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
