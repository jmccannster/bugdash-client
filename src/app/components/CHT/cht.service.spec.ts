import { TestBed } from '@angular/core/testing';

import { CHTService } from './cht.service';

describe('CHTService', () => {
  let service: CHTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CHTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
