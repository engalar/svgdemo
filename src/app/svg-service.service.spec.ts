import { TestBed, inject } from '@angular/core/testing';

import { SvgServiceService } from './svg-service.service';

describe('SvgServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvgServiceService]
    });
  });

  it('should be created', inject([SvgServiceService], (service: SvgServiceService) => {
    expect(service).toBeTruthy();
  }));
});
