import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

export function EmailExistenceValidator(controlName: string) {
  const dataService = new DataService();

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors['DoesNotExist']) {
      return;
    }

    dataService.getUserData(control.value)
      ? control.setErrors(null)
      : control.setErrors({ DoesNotExist: true });
  };
}
