import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthentificateService } from '../services/authentificate.service';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DialogSetPassword } from './dialogs/set-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly SNACK_BAR_MESSAGE: string = 'You must to create password!!!';
  readonly SNACK_BAR_CLOSE: string = 'Ok';
  readonly SNACK_BAR_HORIZONTAL_POSITION: MatSnackBarHorizontalPosition =
    'center';
  readonly SNACK_BAR_VERTICAL_POSITION: MatSnackBarVerticalPosition = 'top';

  public hasPassword: boolean = true;
  public hidePassword: boolean = true;
  public showErrorMessage: boolean = false;
  public loginForm!: FormGroup;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private authentificateService: AuthentificateService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  private allowLogIn(): void {
    this.loginForm.controls['email'].setErrors(null);
    this.loginForm.controls['password'].setErrors(null);
    this.showErrorMessage = false;
    this.router.navigate(['/']);
  }

  private forbidLogIn(): void {
    this.loginForm.controls['email'].setErrors([{ loginNotConfirm: true }]);
    this.loginForm.controls['password'].setErrors([{ loginNotConfirm: true }]);
    this.showErrorMessage = true;
  }

  private setPassword(): void {
    const dialogRef = this.dialog.open(DialogSetPassword);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authentificateService.setPassword(result.value.password);
        this.allowLogIn();
      } else {
        this._snackBar.open(this.SNACK_BAR_MESSAGE, this.SNACK_BAR_CLOSE, {
          horizontalPosition: this.SNACK_BAR_HORIZONTAL_POSITION,
          verticalPosition: this.SNACK_BAR_VERTICAL_POSITION,
        });
      }
    });
  }

  public disablePasswordField(): void {
    this.hasPassword = !this.hasPassword;
    this.hasPassword
      ? this.loginForm.get('password')!.enable()
      : this.loginForm.get('password')!.disable();
  }

  public logIn(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const authStatus: string = this.authentificateService.login(
      email,
      password,
      this.hasPassword
    );
    switch (authStatus) {
      case 'allow': {
        this.allowLogIn();
        break;
      }
      case 'forbid': {
        this.forbidLogIn();
        break;
      }
      case 'setPassword': {
        this.setPassword();
        break;
      }
    }
  }
}
