import { async, ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
=======
import { DebugElement } from '@angular/core';
>>>>>>> 8a31394e5c629e466d5899d18d150bc14ee3e98e

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
<<<<<<< HEAD

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
=======
  let de: DebugElement;

  beforeEach(async(() => {

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  }));
>>>>>>> 8a31394e5c629e466d5899d18d150bc14ee3e98e

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
