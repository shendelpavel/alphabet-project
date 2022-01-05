import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthentificateService } from '../services/authentificate.service';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DialogSetPassword } from './components/set-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hasPassword: boolean = true;
  hidePassword: boolean = true;

  snackBarMessage: string = 'You must to create password!!!';
  snackBarClose: string = 'Ok';
  snackBarHorizontal: MatSnackBarHorizontalPosition = 'center';
  snackBarVertical: MatSnackBarVerticalPosition = 'top';

  showErrorMessage: boolean = false;

  loginForm!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authentificateService: AuthentificateService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  disablePasswordField() {
    this.hasPassword = !this.hasPassword;
    this.hasPassword
      ? this.loginForm.get('password')!.enable()
      : this.loginForm.get('password')!.disable();
  }

  logIn() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const jsonUserData = this.checkEmail(email);
    if (jsonUserData) {
      const userData = JSON.parse(jsonUserData);
      userData.password || this.hasPassword
        ? this.checkPassword(password, userData.password, userData)
        : this.setPassword(userData);
    } else {
      this.forbidLogIn();
    }
  }

  checkEmail(email: string) {
    let jsonUserData = localStorage.getItem(email);
    return jsonUserData;
  }

  checkPassword(password: string, dataPassword: string, userData: any) {
    password === dataPassword ? this.allowLogIn(userData) : this.forbidLogIn();
  }

  setPassword(userData: any) {
    const dialogRef = this.dialog.open(DialogSetPassword);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        userData.password = result.value.password;
        const jsonUserData = JSON.stringify(userData);
        localStorage.setItem(userData.email, jsonUserData);
        this.allowLogIn(userData);
      } else {
        this._snackBar.open(this.snackBarMessage, this.snackBarClose, {
          horizontalPosition: this.snackBarHorizontal,
          verticalPosition: this.snackBarVertical,
        });
      }
    });
  }

  forbidLogIn() {
    this.loginForm.controls['email'].setErrors([{ loginNotConfirm: true }]);
    this.loginForm.controls['password'].setErrors([{ loginNotConfirm: true }]);
    this.showErrorMessage = true;
  }

  allowLogIn(userData: any) {
    this.loginForm.controls['email'].setErrors(null);
    this.loginForm.controls['password'].setErrors(null);
    this.showErrorMessage = false;
    this.setStatus(userData);
    this.setSessionData(userData);
  }

  setStatus(userData: any) {
    userData.isLoggedIn = true;
    const jsonUserData = JSON.stringify(userData);
    localStorage.setItem(userData.email, jsonUserData);
  }

  setSessionData(userData: any) {
    this.authentificateService.setStatus(userData.isLoggedIn);
    this.authentificateService.setRole(userData.role);
    this.authentificateService.setEmail(userData.email);
  }
}
