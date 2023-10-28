import { TestBed } from '@angular/core/testing';

import { JurisdictionListService } from './jurisdiction-list.service';

describe('JurisdictionListService', () => {
  let service: JurisdictionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JurisdictionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
