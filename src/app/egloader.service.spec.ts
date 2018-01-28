import { TestBed, inject } from '@angular/core/testing';

import { EgloaderService } from './egloader.service';

describe('EgloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EgloaderService]
    });
  });

  it('should be created', inject([EgloaderService], (service: EgloaderService) => {
    expect(service).toBeTruthy();
  }));
});
