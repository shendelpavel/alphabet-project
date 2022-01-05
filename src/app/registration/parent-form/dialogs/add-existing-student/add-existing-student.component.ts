import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailExistenceValidator } from '../../../validators/email-existence.validator';

@Component({
  selector: 'dialog-add-existing-student',
  templateUrl: './dialog-add-existing-student.html',
})
export class DialogAddExistingStudent {
  readonly EMAIL_PATTERN_REGEX =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  public existingStudentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddExistingStudent>
  ) {
    this.existingStudentForm = this.formBuilder.group(
      {
        email: [
          '',
          [Validators.required, Validators.pattern(this.EMAIL_PATTERN_REGEX)],
        ],
      },
      { validator: EmailExistenceValidator('email') }
    );
  }

  public checkControlErrors(controlName: string): boolean {
    const control: FormControl = this.existingStudentForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
