import { TestBed } from '@angular/core/testing';

import { WebsiteServiceService } from './website-service.service';

describe('WebsiteServiceService', () => {
  let service: WebsiteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
