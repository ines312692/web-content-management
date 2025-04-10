import { TestBed } from '@angular/core/testing';

import { PageServiceService } from './page-service.service';

describe('PageServiceService', () => {
  let service: PageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
