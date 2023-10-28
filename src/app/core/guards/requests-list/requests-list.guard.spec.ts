import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { requestsListGuard } from './requests-list.guard';

describe('requestsListGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => requestsListGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
