import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FieldType, FormFieldDefinitionValue } from '@model/form-fields';
import { FormBuilderService } from '@services/form-builder/form-builder';

@Component({
  selector: 'app-editable-form-field',
  imports: [
    MatFormFieldModule,
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
  formBuilderService = inject(FormBuilderService);

  form = input.required<FormGroup>();
  formField = input.required<FormFieldDefinitionValue>();
  isFirst = input<boolean>(false);
  isLast = input<boolean>(false);
  onMoveUp = output<Event>();
  onMoveDown = output<Event>();

  FieldType = FieldType;

  get id(): string {
    return this.formField().id;
  }

  ngOnInit(): void {}

  onTitleChange(e: Event) {}

  onClickMoveUp(e: Event) {
    this.onMoveUp.emit(e);
  }

  onClickMoveDown(e: Event) {
    this.onMoveDown.emit(e);
  }

  onRemoveField(e: Event) {
    e.stopPropagation();
    this.formBuilderService.removeFormFieldDefinition(this.formField().id);
  }

  onChangeRequired() {
    this.formBuilderService.toggleRequiredField(this.formField().id);
  }
}
