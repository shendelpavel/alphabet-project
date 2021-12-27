import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailInUseValidator } from '../../validators/email-in-use.validator';

@Component({
  selector: 'dialog-add-new-student',
  templateUrl: '../dialogs/dialog-add-new-student.html',
  styleUrls: ['../dialogs/dialog-add-new-student.scss'],
})
export class DialogAddNewStudent {
  phoneRegx = /^\+?([0-9]{10,13})$/;
  emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  newStudentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddNewStudent>,
    private formBuilder: FormBuilder
  ) {
    this.newStudentForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(this.phoneRegx)],
        ],
      },
      {
        validator: [EmailInUseValidator('email')],
      }
    );
  }

  checkControlErrors(controlName: any) {
    let control: FormControl = this.newStudentForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
