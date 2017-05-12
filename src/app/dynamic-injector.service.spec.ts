import { TestBed, inject } from '@angular/core/testing';

import { DynamicInjectorService } from './dynamic-injector.service';

describe('DynamicInjectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicInjectorService]
    });
  });

  it('should ...', inject([DynamicInjectorService], (service: DynamicInjectorService) => {
    expect(service).toBeTruthy();
  }));
});
