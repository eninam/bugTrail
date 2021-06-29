import { TestBed } from '@angular/core/testing';

import { OneProjectService } from './one-project.service';

describe('OneProjectService', () => {
  let service: OneProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
