import { FormGroup } from "@angular/forms";

export function PasswordConfirmValidator(
  controlName: string,
  confirmingControlName: string
) {
  return (formGroup: FormGroup): void => {
    const control = formGroup.controls[ controlName ];
    const confirmingControl = formGroup.controls[ confirmingControlName ];

    if (confirmingControl.errors && !confirmingControl.errors[ "notConfirmed" ]) {
      return;
    }

    if (control.value !== confirmingControl.value) {
      confirmingControl.setErrors({ notConfirmed: true });
    } else {
      confirmingControl.setErrors(null);
    }
  };
}
