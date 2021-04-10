import { TestBed } from '@angular/core/testing';

import { MunicipilityService } from './municipility.service';

describe('MunicipilityService', () => {
  let service: MunicipilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
