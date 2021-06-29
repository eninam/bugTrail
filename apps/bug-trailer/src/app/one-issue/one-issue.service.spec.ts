import { TestBed } from '@angular/core/testing';

import { OneIssueService } from './one-issue.service';

describe('OneIssueService', () => {
  let service: OneIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
