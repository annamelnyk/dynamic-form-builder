import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildForm } from './build-form';

describe('BuildForm', () => {
  let component: BuildForm;
  let fixture: ComponentFixture<BuildForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
