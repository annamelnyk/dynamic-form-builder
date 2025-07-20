import { TestBed } from '@angular/core/testing';

import { FormFieldControl } from './form-field-control';

describe('FormFieldControl', () => {
  let service: FormFieldControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFieldControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
