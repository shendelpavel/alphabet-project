import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PasswordConfirmValidator } from '../../validators/password-confirm.validator';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ParentFormComponent implements OnInit {
  hidePassword = true;
  hideConfirmPassword = true;

  phoneRegx = /^\+?([0-9]{10,13})$/;

  parentForm!: FormGroup;

  addedNewStudents!: FormArray;

  addedExistingStudents!: FormArray;

  stepperOrientation: any = 'horizontal';

  public screenWidth: any;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group(
      {
        role: ['parent'],
        isLoggedIn: [false],
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(this.phoneRegx)],
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        addedNewStudents: this.formBuilder.array([]),
        addedExistingStudents: this.formBuilder.array([]),
      },
      { validator: PasswordConfirmValidator('password', 'confirmPassword') }
    );
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.setStepperOrientation();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.setStepperOrientation();
  }

  setStepperOrientation(): any {
    if (this.screenWidth < 1440) {
      this.stepperOrientation = 'vertical';
    } else {
      this.stepperOrientation = 'horizontal';
    }
  }

  get arrayOfNewStudents(): FormArray {
    return this.parentForm.get('addedNewStudents') as FormArray;
  }

  get arrayOfExistingStudents(): FormArray {
    return this.parentForm.get('addedExistingStudents') as FormArray;
  }

  addNewStudent(): void {
    const dialogRef = this.dialog.open(DialogAddNewStudent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedNewStudents = this.arrayOfNewStudents;
        this.addedNewStudents.push(result);
      }
    });
  }

  deleteNewStudent(index: number): void {
    this.addedNewStudents = this.arrayOfNewStudents;
    this.addedNewStudents.removeAt(index);
  }

  addExistingStudent(): void {
    const dialogRef = this.dialog.open(DialogAddExistingStudent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedExistingStudents = this.arrayOfExistingStudents;
        this.addedExistingStudents.push(result);
      }
    });
  }

  deleteExistingStudent(index: number): void {
    this.addedExistingStudents = this.arrayOfExistingStudents;
    this.addedExistingStudents.removeAt(index);
  }

  clearStudents(): void {
    this.addedNewStudents = this.arrayOfNewStudents;
    this.addedNewStudents.clear();

    this.addedExistingStudents = this.arrayOfExistingStudents;
    this.addedExistingStudents.clear();
  }

  signUp() {
    if (this.arrayOfNewStudents.length > 0) {
      for (let newStudent of this.arrayOfNewStudents.controls) {
        const jsonNewStudent = JSON.stringify(newStudent.value);
        localStorage.setItem(newStudent.value['email'], jsonNewStudent);
      }
    }
    const jsonParent = JSON.stringify(this.parentForm.value);
    localStorage.setItem(this.parentForm.value['email'], jsonParent);
  }
}

@Component({
  selector: 'dialog-add-new-student',
  templateUrl: './additional-components/dialog-add-new-student.html',
  styleUrls: ['./additional-components/dialog-add-new-student.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class DialogAddNewStudent {
  phoneRegx = /^\+?([0-9]{10,13})$/;

  newStudentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddNewStudent>,
    private formBuilder: FormBuilder
  ) {
    this.newStudentForm = this.formBuilder.group({
      role: ['student'],
      isLoggedIn: [false],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(this.phoneRegx)],
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-add-existing-student',
  templateUrl: './additional-components/dialog-add-existing-student.html',
})
export class DialogAddExistingStudent {
  phoneRegx = /^\+?([0-9]{10,13})$/;

  existingStudentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddExistingStudent>,
    private formBuilder: FormBuilder
  ) {
    this.existingStudentForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
