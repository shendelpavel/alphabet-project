import { FormGroup } from '@angular/forms';
import { Parent, Student } from 'src/app/services/shared/user.model';

export function AddedUserExistsValidator(
  controlName: string,
  userStatus: string,
  isExistUser: (email: string) => string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors['DoesNotExist']) {
      return;
    }

    if (isExistUser(control.value)) {
      const user: Student | Parent = JSON.parse(isExistUser(control.value));
      userStatus === user.role
        ? control.setErrors(null)
        : control.setErrors({ DoesNotExist: true });
    } else {
      control.setErrors({ DoesNotExist: true });
    }
  };
}
