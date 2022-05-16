import {TestBed} from '@angular/core/testing';

import {GeneraldataService} from './generaldata.service';

describe('GeneraldataService', () => {
  let service: GeneraldataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneraldataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
