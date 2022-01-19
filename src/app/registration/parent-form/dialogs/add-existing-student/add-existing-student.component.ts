import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EMAIL_PATTERN_REGEX } from 'src/app/registration/regular-expressions';
import { DataService } from 'src/app/services/data.service';
import { EmailExistenceValidator } from '../../../validators/email-existence.validator';

@Component({
  selector: 'dialog-add-existing-student',
  templateUrl: './dialog-add-existing-student.html',
})
export class DialogAddExistingStudent {
  public existingStudentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddExistingStudent>,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.existingStudentForm = this.formBuilder.group(
      {
        email: [
          '',
          [Validators.required, Validators.pattern(EMAIL_PATTERN_REGEX)],
        ],
      },
      {
        validator: EmailExistenceValidator(
          'email',
          this.dataService.getUserData
        ),
      }
    );
  }

  public checkControlErrors(controlName: string): boolean {
    const control: FormControl = this.existingStudentForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
