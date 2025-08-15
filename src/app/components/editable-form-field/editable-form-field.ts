import { NgComponentOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { ButtonIcon, Icon } from '@components/button-icon/button-icon'
import { FieldType, FormFieldDefinitionValue } from '@model/form-fields'
import { FieldTypesService } from '@services/field-types/field-types'
import { FormBuilderService } from '@services/form-builder/form-builder'

@Component({
  selector: 'app-editable-form-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgComponentOutlet,
    ButtonIcon,
  ],
  templateUrl: './editable-form-field.html',
  styleUrl: './editable-form-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableFormField {
  formBuilderService = inject(FormBuilderService)
  fieldTypesService = inject(FieldTypesService)
  ngFormBuilder = inject(FormBuilder)
  destroyRef = inject(DestroyRef)

  form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()
  isFirst = input<boolean>(false)
  isLast = input<boolean>(false)
  onMoveUp = output<Event>()
  onMoveDown = output<Event>()

  protected Icon = Icon
  protected FieldType = FieldType
  controlsForm!: FormGroup

  get id(): string {
    return this.formField().id
  }

  get label(): string {
    return this.formField().label || this.defaultLabel
  }

  get defaultLabel(): string {
    const defaultFormFieldDefiniton = this.fieldTypesService.getFormFieldDefinitions(
      this.formField().type,
    )
    return defaultFormFieldDefiniton?.label ?? ''
  }

  get required(): boolean {
    return this.formField().required || false
  }

  ngOnInit(): void {
    this.addControlsFromGroup()
  }

  addControlsFromGroup() {
    this.controlsForm = this.ngFormBuilder.group({
      label: [this.label],
      required: [this.required],
    })

    this.controlsForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(values => {
      this.formBuilderService.updateFormField(this.formField().id, values)
    })
  }

  onTitleChange(e: Event) {}

  onClickMoveUp(e: Event) {
    this.onMoveUp.emit(e)
  }

  onClickMoveDown(e: Event) {
    this.onMoveDown.emit(e)
  }

  onFieldRemoveHandler(id: string) {
    this.formBuilderService.removeFormFieldDefinition(id)
  }
}
