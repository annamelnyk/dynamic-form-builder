import { TestBed } from '@angular/core/testing';

import { BuildMode } from './build-mode';

describe('BuildMode', () => {
  let service: BuildMode;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildMode);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
