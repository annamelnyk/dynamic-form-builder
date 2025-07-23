import { NgComponentOutlet, TitleCasePipe } from '@angular/common'
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
import { debounceTime } from 'rxjs/operators'
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FieldType, FormFieldDefinitionValue } from '@model/form-fields'
import { FormBuilderService } from '@services/form-builder/form-builder'

@Component({
  selector: 'app-editable-form-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    TitleCasePipe,
    MatCheckboxModule,
    NgComponentOutlet,
  ],
  templateUrl: './editable-form-field.html',
  styleUrl: './editable-form-field.scss',
})
export class EditableFormField implements OnInit {
  formBuilderService = inject(FormBuilderService)
  ngFormBuilder = inject(FormBuilder)
  destroyRef = inject(DestroyRef)

  form = input.required<FormGroup>()
  formField = input.required<FormFieldDefinitionValue>()
  isFirst = input<boolean>(false)
  isLast = input<boolean>(false)
  onMoveUp = output<Event>()
  onMoveDown = output<Event>()

  FieldType = FieldType
  controlsForm!: FormGroup

  get id(): string {
    return this.formField().id
  }

  ngOnInit(): void {
    this.controlsForm = this.ngFormBuilder.group({
      label: [this.formField()?.label ?? ''],
      required: [this.formField()?.required ?? ''],
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
