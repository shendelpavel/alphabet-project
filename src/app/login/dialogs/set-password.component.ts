import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PasswordConfirmValidator } from '../../validators/password-confirm.validator';

@Component({
  selector: 'dialog-set-password',
  templateUrl: '../dialogs/dialog-set-password.html',
  styleUrls: ['../dialogs/dialog-set-password.scss'],
})
export class DialogSetPassword {
  public hidePassword = true;
  public hideConfirmPassword = true;
  public setPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogSetPassword>
  ) {
    this.setPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: PasswordConfirmValidator('password', 'confirmPassword') }
    );
  }

  public checkControlErrors(controlName: string): boolean {
    let control: FormControl = this.setPasswordForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
