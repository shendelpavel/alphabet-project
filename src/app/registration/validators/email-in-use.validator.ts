import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

export function EmailInUseValidator(controlName: string) {
  const dataService = new DataService();

  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors['inUse']) {
      return;
    }

    dataService.getUserData(control.value)
      ? control.setErrors({ inUse: true })
      : control.setErrors(null);
  };
}
