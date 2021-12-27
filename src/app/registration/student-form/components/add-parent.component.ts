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
  selector: 'dialog-add-parent',
  templateUrl: '../dialogs/dialog-add-parent.html',
})
export class DialogAddParent {
  emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  parentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddParent>,
    private formBuilder: FormBuilder
  ) {
    this.parentForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      },
      { validator: EmailExistenceValidator('email') }
    );
  }

  checkControlErrors(controlName: any) {
    let control: FormControl = this.parentForm.get(controlName) as FormControl;
    return control.invalid && control.touched;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
