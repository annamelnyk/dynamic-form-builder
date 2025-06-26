import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTool } from './control-tool';

describe('ControlTool', () => {
  let component: ControlTool;
  let fixture: ComponentFixture<ControlTool>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlTool]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlTool);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
