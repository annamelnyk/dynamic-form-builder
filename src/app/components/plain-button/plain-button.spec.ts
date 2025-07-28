import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainButton } from './plain-button';

describe('PlainButton', () => {
  let component: PlainButton;
  let fixture: ComponentFixture<PlainButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlainButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlainButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
