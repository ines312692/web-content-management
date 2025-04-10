import { TestBed } from '@angular/core/testing';

import { NodeServiceService } from './node-service.service';

describe('NodeServiceService', () => {
  let service: NodeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
