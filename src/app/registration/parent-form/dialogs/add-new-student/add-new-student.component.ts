import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailInUseValidator } from '../../../validators/email-in-use.validator';

@Component({
  selector: 'dialog-add-new-student',
  templateUrl: './dialog-add-new-student.html',
  styleUrls: ['./dialog-add-new-student.scss'],
})
export class DialogAddNewStudent {
  readonly PHONE_PATTERN_REGEX = /^\+?([0-9]{10,13})$/;
  readonly EMAIL_PATTERN_REGEX =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  public newStudentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddNewStudent>
  ) {
    this.newStudentForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.pattern(this.EMAIL_PATTERN_REGEX)],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(this.PHONE_PATTERN_REGEX)],
        ],
      },
      {
        validator: [EmailInUseValidator('email')],
      }
    );
  }

  public checkControlErrors(controlName: string): boolean {
    const control: FormControl = this.newStudentForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
