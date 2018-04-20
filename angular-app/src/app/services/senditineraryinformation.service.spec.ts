import { TestBed, inject } from '@angular/core/testing';

import { SenditineraryinformationService } from './senditineraryinformation.service';

describe('SenditineraryinformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SenditineraryinformationService]
    });
  });

  it('should be created', inject([SenditineraryinformationService], (service: SenditineraryinformationService) => {
    expect(service).toBeTruthy();
  }));
});
