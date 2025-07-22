import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditableFormField } from './editable-form-field'

describe('EditableFormField', () => {
  let component: EditableFormField
  let fixture: ComponentFixture<EditableFormField>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableFormField],
    }).compileComponents()

    fixture = TestBed.createComponent(EditableFormField)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
