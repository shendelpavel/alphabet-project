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
import { AuthStatus } from '../services/shared/auth-status';
import { TooltipService } from '../services/tooltip.service';

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

  public hidePassword: boolean = true;
  public isTooltipShown: boolean = false;
  public loginForm!: FormGroup;
  public tooltipElement!: DOMRect;

  private statuses = {
    allow: () => this.allowLogIn(),
    forbid: () => this.forbidLogIn(),
    setPassword: () => this.setPassword(),
  };

  constructor(
    public readonly dialog: MatDialog,
    private readonly tooltipService: TooltipService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly authentificateService: AuthentificateService,
    private readonly formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public logIn(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const authStatus: AuthStatus = this.authentificateService.login(
      email,
      password
    );
    this.setAuthStatus(authStatus);
  }

  private setAuthStatus(authStatus: AuthStatus): void {
    this.statuses[authStatus]();
  }

  private allowLogIn(): void {
    this.loginForm.controls['email'].setErrors(null);
    this.loginForm.controls['password'].setErrors(null);
    this.router.navigate(['/']);
  }

  private forbidLogIn(): void {
    this.loginForm.controls['email'].setErrors([{ loginNotConfirm: true }]);
    this.loginForm.controls['password'].setErrors([{ loginNotConfirm: true }]);
  }

  private setPassword(): void {
    const dialogRef = this.dialog.open(DialogSetPassword);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authentificateService.setPassword(result.value.password);
        this.allowLogIn();
      } else {
        this.snackBar.open(this.SNACK_BAR_MESSAGE, this.SNACK_BAR_CLOSE, {
          horizontalPosition: this.SNACK_BAR_HORIZONTAL_POSITION,
          verticalPosition: this.SNACK_BAR_VERTICAL_POSITION,
        });
      }
    });
  }

  public showTooltip(): void {
    const tooltipElement: HTMLElement | null = document.querySelector('.help');
    const tooltipElementPosition: DOMRect =
      tooltipElement!.getBoundingClientRect();
    this.tooltipElement = tooltipElementPosition;
    this.isTooltipShown = true;
    this.tooltipService.setTooltipStatus(this.isTooltipShown);
  }

  public hideTooltip(): void {
    this.isTooltipShown = false;
    this.tooltipService.setTooltipStatus(this.isTooltipShown);
  }
}
