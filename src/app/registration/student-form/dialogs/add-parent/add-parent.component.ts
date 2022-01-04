import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailExistenceValidator } from 'src/app/registration/validators/email-existence.validator';

@Component({
  selector: 'dialog-add-parent',
  templateUrl: './dialog-add-parent.html',
})
export class DialogAddParent {
  readonly EMAIL_PATTERN_REGEX =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  public parentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddParent>
  ) {
    this.parentForm = this.formBuilder.group(
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
    let control: FormControl = this.parentForm.get(controlName) as FormControl;
    return control.invalid && control.touched;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
