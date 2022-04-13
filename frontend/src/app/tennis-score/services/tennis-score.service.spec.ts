import { TestBed } from '@angular/core/testing';

import { TennisScoreService } from './tennis-score.service';

describe('TennisScoreService', () => {
  let service: TennisScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TennisScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
