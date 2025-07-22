import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormModeSwitcher } from './form-mode-switcher'

describe('FormModeSwitcher', () => {
  let component: FormModeSwitcher
  let fixture: ComponentFixture<FormModeSwitcher>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModeSwitcher],
    }).compileComponents()

    fixture = TestBed.createComponent(FormModeSwitcher)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
