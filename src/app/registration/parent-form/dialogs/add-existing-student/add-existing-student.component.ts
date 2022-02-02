import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMAIL_PATTERN_REGEX } from 'src/app/registration/regular-expressions';
import { DataService } from 'src/app/services/data.service';
import { UserStatus } from 'src/app/services/shared/user-status';
import { Student } from 'src/app/services/shared/user.model';
import { AddedUserExistsValidator } from 'src/app/registration/validators/added-user-exists.validator';

interface DialogData {
  student: Student;
}

@Component({
  selector: 'dialog-add-existing-student',
  templateUrl: './dialog-add-existing-student.html',
})
export class DialogAddExistingStudent {
  public existingStudentForm!: FormGroup;

  constructor(
    public readonly dialogRef: MatDialogRef<DialogAddExistingStudent>,
    private readonly dataService: DataService,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public readonly data?: DialogData
  ) {
    this.existingStudentForm = this.formBuilder.group(
      {
        email: [
          data?.student.email || '',
          [Validators.required, Validators.pattern(EMAIL_PATTERN_REGEX)],
        ],
      },
      {
        validator: AddedUserExistsValidator(
          'email',
          UserStatus.Student,
          this.dataService.getUserData
        ),
      }
    );
  }

  public checkControlErrors(controlName: string): boolean {
    const control: FormControl = this.existingStudentForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
