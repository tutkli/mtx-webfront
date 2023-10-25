import { TestBed } from '@angular/core/testing';

import { AppConfigurationApiService } from './app-configuration-api.service';

describe('AppConfigurationApiService', () => {
  let service: AppConfigurationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppConfigurationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
