import { TestBed, inject } from '@angular/core/testing';

import { SharedSearchResultsService } from './shared-search-results.service';

describe('SharedSearchResultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedSearchResultsService]
    });
  });

  it('should be created', inject([SharedSearchResultsService], (service: SharedSearchResultsService) => {
    expect(service).toBeTruthy();
  }));
});
