import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewForm } from './preview-form';

describe('PreviewForm', () => {
  let component: PreviewForm;
  let fixture: ComponentFixture<PreviewForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
