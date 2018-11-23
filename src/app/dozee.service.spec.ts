import { TestBed } from '@angular/core/testing';

import { DozeeService } from './dozee.service';

describe('DozeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DozeeService = TestBed.get(DozeeService);
    expect(service).toBeTruthy();
  });
});
