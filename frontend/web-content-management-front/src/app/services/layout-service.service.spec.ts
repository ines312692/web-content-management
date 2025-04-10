import { TestBed } from '@angular/core/testing';

import { LayoutServiceService } from './layout-service.service';

describe('LayoutServiceService', () => {
  let service: LayoutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
