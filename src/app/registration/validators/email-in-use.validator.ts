import { FormGroup } from '@angular/forms';

export function EmailInUseValidator(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors['inUse']) {
      return;
    }

    if (localStorage.getItem(control.value)) {
      control.setErrors({ inUse: true });
    } else {
      control.setErrors(null);
    }
  };
}
