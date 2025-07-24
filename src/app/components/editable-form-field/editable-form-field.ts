import { NgComponentOutlet } from '@angular/common'
import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  linkedSignal,
  OnInit,
  output,
  signal,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatInputModule } from '@angular/material/input'
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FieldType, FormFieldDefinitionValue } from '@model/form-fields'
import { FormBuilderService } from '@services/form-builder/form-builder'
import { FieldTypesService } from '@services/field-types/field-types'

@Component({
  selector: 'app-editable-form-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,

    MatCheckboxModule,
    NgComponentOutlet,
  ],
  templateUrl: './editable-form-field.html',
  styleUrl: './editable-form-field.scss',
})
export class EditableFormField implements OnInit {
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

  placeholder = computed(() => `Enter ${this.label}`)

  FieldType = FieldType
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
    this.controlsForm = this.ngFormBuilder.group({
      label: [''],
      required: [this.required],
    })

    this.controlsForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(values => {
      console.log('value updated ', values)
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

  onRemoveField(e: Event) {
    e.stopPropagation()
    this.formBuilderService.removeFormFieldDefinition(this.formField().id)
  }
}
