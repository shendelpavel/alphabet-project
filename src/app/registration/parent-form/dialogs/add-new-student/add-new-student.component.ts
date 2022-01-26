import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  EMAIL_PATTERN_REGEX,
  PHONE_PATTERN_REGEX,
} from 'src/app/registration/regular-expressions';
import { DataService } from 'src/app/services/data.service';
import { Parent, Student } from 'src/app/services/shared/user.model';
import { EmailInUseValidator } from '../../../validators/email-in-use.validator';

interface DialogData {
  student: Student;
}

@Component({
  selector: 'dialog-add-new-student',
  templateUrl: './dialog-add-new-student.html',
  styleUrls: ['./dialog-add-new-student.scss'],
})
export class DialogAddNewStudent {
  public newStudentForm!: FormGroup;

  constructor(
    public readonly dialogRef: MatDialogRef<DialogAddNewStudent>,
    private readonly dataService: DataService,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public readonly data?: DialogData
  ) {
    this.newStudentForm = this.formBuilder.group(
      {
        role: ['student'],
        isLoggedIn: [false],
        name: [data?.student.name || '', [Validators.required]],
        lastName: [data?.student.lastName || '', [Validators.required]],
        email: [
          data?.student.email || '',
          [Validators.required, Validators.pattern(EMAIL_PATTERN_REGEX)],
        ],
        phoneNumber: [
          data?.student.phoneNumber || '',
          [Validators.required, Validators.pattern(PHONE_PATTERN_REGEX)],
        ],
        password: [data?.student.password || ''],
        addedParents: this.formBuilder.array([]),
      },
      {
        validator: [EmailInUseValidator('email', this.dataService.getUserData)],
      }
    );
  }

  public checkControlErrors(controlName: string): boolean {
    const control: FormControl = this.newStudentForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
