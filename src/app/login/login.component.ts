import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PasswordConfirmValidator } from '../utils/password-confirm.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class LoginComponent implements OnInit {
  hidePassword = true;

  loginForm!: FormGroup;

  hasPassword: boolean = true;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],

      password: ['', [Validators.required]],
    });
  }

  test() {
    this.hasPassword = !this.hasPassword;
    this.hasPassword
      ? this.loginForm.get('password')!.enable()
      : this.loginForm.get('password')!.disable();
  }

  ngOnInit(): void {}

  logIn() {
    if (this.checkLogin()) {
      this.loginForm.controls['email'].setErrors(null);
      this.loginForm.controls['password'].setErrors(null);
      console.log("You're logedIn!!!!");
    } else {
      this.loginForm.controls['email'].setErrors([{ loginNotConfirm: true }]);
      this.loginForm.controls['password'].setErrors([
        { loginNotConfirm: true },
      ]);
    }
  }

  checkLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    let jsonUserData = localStorage.getItem(email);
    if (jsonUserData) {
      let userData = JSON.parse(jsonUserData);
      if (!userData.password) {
        if (this.setPassword(userData)) {
          this.setStatus(userData);
          return true;
        } else {
          this._snackBar.open('You must to create password!!!', 'Ok');
          return false;
        }
      }
      if (password === userData.password) {
        this.setStatus(userData);
        return true;
      }
    }
    return false;
  }

  setStatus(userData: any) {
    userData.isLoggedIn = true;
    this.setSessionData(userData);
    const jsonUserData = JSON.stringify(userData);
    localStorage.setItem(userData.email, jsonUserData);
  }

  setSessionData(userData: any) {
    this.dataService.setStatus(userData.isLoggedIn);
    this.dataService.setRole(userData.role);
    this.dataService.setEmail(userData.email);
  }

  setPassword(userData: any): boolean {
    const dialogRef = this.dialog.open(DialogSetPassword);
    dialogRef.afterClosed().subscribe((result) => {
      if (result.value.password) {
        userData.password = result.value.password;
        userData.confirmPassword = result.value.confirmPassword;
        const jsonUserData = JSON.stringify(userData);
        localStorage.setItem(userData.email, jsonUserData);
        return true;
      }
      return false;
    });
    return false;
  }
}

@Component({
  selector: 'dialog-set-password',
  templateUrl: './additional-components/dialog-set-password.html',
})
export class DialogSetPassword {
  hidePassword = true;
  hideConfirmPassword = true;

  setPasswordForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogSetPassword>,
    private formBuilder: FormBuilder
  ) {
    this.setPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: PasswordConfirmValidator('password', 'confirmPassword') }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
