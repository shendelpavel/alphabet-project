import { FormGroup } from "@angular/forms";

export function EmailInUseValidator(
  controlName: string,
  isExistUser: (email: string) => string
) {
  return (formGroup: FormGroup): void => {
    const control = formGroup.controls[ controlName ];

    if (control.errors && !control.errors[ "inUse" ]) {
      return;
    }

    isExistUser(control.value)
      ? control.setErrors({ inUse: true })
      : control.setErrors(null);
  };
}
