import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFormCanvas } from './preview-form-canvas';

describe('PreviewFormCanvas', () => {
  let component: PreviewFormCanvas;
  let fixture: ComponentFixture<PreviewFormCanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewFormCanvas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewFormCanvas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
