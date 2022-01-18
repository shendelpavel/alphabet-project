import { FormGroup } from '@angular/forms';

export function EmailExistenceValidator(
  controlName: string,
  isExistUser: (email: string) => string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors['DoesNotExist']) {
      return;
    }

    isExistUser(control.value)
      ? control.setErrors(null)
      : control.setErrors({ DoesNotExist: true });
  };
}
