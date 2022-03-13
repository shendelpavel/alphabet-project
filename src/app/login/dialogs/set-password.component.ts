import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { PasswordConfirmValidator } from "../../validators/password-confirm.validator";

@Component({
  selector: "ap-dialog-set-password",
  templateUrl: "../dialogs/dialog-set-password.html",
  styleUrls: [ "../dialogs/dialog-set-password.scss" ]
})
export class DialogSetPasswordComponent {
  public hidePassword = true;
  public hideConfirmPassword = true;
  public setPasswordForm!: FormGroup;

  constructor(
    public readonly dialogRef: MatDialogRef<DialogSetPasswordComponent>,
    private readonly formBuilder: FormBuilder
  ) {
    this.setPasswordForm = this.formBuilder.group(
      {
        password: [ "", [ Validators.required ] ],
        confirmPassword: [ "", [ Validators.required ] ]
      },
      { validator: PasswordConfirmValidator("password", "confirmPassword") }
    );
  }

  public checkControlErrors(controlName: string): boolean {
    const control: FormControl = this.setPasswordForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
