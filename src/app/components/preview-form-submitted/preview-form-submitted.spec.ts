import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFormSubmitted } from './preview-form-submitted';

describe('PreviewFormSubmitted', () => {
  let component: PreviewFormSubmitted;
  let fixture: ComponentFixture<PreviewFormSubmitted>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewFormSubmitted]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewFormSubmitted);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
