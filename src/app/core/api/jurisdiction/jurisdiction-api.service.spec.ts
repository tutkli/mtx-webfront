import { TestBed } from '@angular/core/testing';

import { JurisdictionApiService } from './jurisdiction-api.service';

describe('JurisdictionApiService', () => {
  let service: JurisdictionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JurisdictionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
