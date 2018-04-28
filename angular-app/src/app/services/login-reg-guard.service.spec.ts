import { TestBed, inject } from '@angular/core/testing';

import { LoginRegGuardService } from './login-reg-guard.service';

describe('LoginRegGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRegGuardService]
    });
  });

  it('should be created', inject([LoginRegGuardService], (service: LoginRegGuardService) => {
    expect(service).toBeTruthy();
  }));
});
