import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailExistenceValidator } from '../../validators/email-existence.validator';

@Component({
  selector: 'dialog-add-existing-student',
  templateUrl: '../dialogs/dialog-add-existing-student.html',
})
export class DialogAddExistingStudent {
  emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  existingStudentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddExistingStudent>,
    private formBuilder: FormBuilder
  ) {
    this.existingStudentForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      },
      { validator: EmailExistenceValidator('email') }
    );
  }

  checkControlErrors(controlName: any) {
    let control: FormControl = this.existingStudentForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
