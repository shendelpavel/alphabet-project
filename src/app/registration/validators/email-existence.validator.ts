import { FormGroup } from '@angular/forms';

export function EmailExistenceValidator(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors['DoesNotExist']) {
      return;
    }

    if (localStorage.getItem(control.value)) {
      control.setErrors(null);
    } else {
      control.setErrors({ DoesNotExist: true });
    }
  };
}
