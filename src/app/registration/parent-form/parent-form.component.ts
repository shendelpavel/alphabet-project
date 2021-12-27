import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PasswordConfirmValidator } from '../validators/password-confirm.validator';
import { EmailInUseValidator } from '../validators/email-in-use.validator';
import { DialogAddNewStudent } from './components/add-new-student.component';
import { DialogAddExistingStudent } from './components/add-existing-student.component';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
})
export class ParentFormComponent implements OnInit {
  minHorizontalStepperScreen: number = 1440;
  verticalStepper: string = 'vertical';
  horizontalStepper: string = 'horizontal';
  stepperOrientation: any = this.horizontalStepper;
  screenWidth: any;

  hidePassword = true;
  hideConfirmPassword = true;

  phoneRegx = /^\+?([0-9]{10,13})$/;
  emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  parentForm!: FormGroup;

  addedNewStudents!: FormArray;

  addedExistingStudents!: FormArray;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(this.phoneRegx)],
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        addedNewStudents: this.formBuilder.array([]),
        addedExistingStudents: this.formBuilder.array([]),
      },
      {
        validator: [
          PasswordConfirmValidator('password', 'confirmPassword'),
          EmailInUseValidator('email'),
        ],
      }
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
    if (this.screenWidth < this.minHorizontalStepperScreen) {
      this.stepperOrientation = this.verticalStepper;
    } else {
      this.stepperOrientation = this.horizontalStepper;
    }
  }

  get arrayOfNewStudents(): FormArray {
    return this.parentForm.get('addedNewStudents') as FormArray;
  }

  get arrayOfExistingStudents(): FormArray {
    return this.parentForm.get('addedExistingStudents') as FormArray;
  }

  checkControlErrors(controlName: any) {
    let control: FormControl = this.parentForm.get(controlName) as FormControl;
    return control.invalid && control.touched;
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

  editNewStudent(index: number): void {
    const dialogRef = this.dialog.open(DialogAddNewStudent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedNewStudents = this.arrayOfNewStudents;
        this.addedNewStudents.at(index).patchValue(result.value);
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

  editExistingStudent(index: number): void {
    const dialogRef = this.dialog.open(DialogAddExistingStudent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedExistingStudents = this.arrayOfExistingStudents;
        this.addedExistingStudents.at(index).patchValue(result.value);
      }
    });
  }

  deleteExistingStudent(index: number): void {
    this.addedExistingStudents = this.arrayOfExistingStudents;
    this.addedExistingStudents.removeAt(index);
  }

  resetForm(): void {
    this.addedNewStudents = this.arrayOfNewStudents;
    this.addedNewStudents.clear();
    this.addedExistingStudents = this.arrayOfExistingStudents;
    this.addedExistingStudents.clear();
    this.parentForm.reset();
  }

  signUp() {
    if (this.arrayOfNewStudents.length > 0) {
      for (let newStudent of this.arrayOfNewStudents.controls) {
        const jsonNewStudent = JSON.stringify(newStudent.value);
        localStorage.setItem(newStudent.value['email'], jsonNewStudent);
      }
    }
    delete this.parentForm.value.confirmPassword;
    const jsonParent = JSON.stringify(this.parentForm.value);
    localStorage.setItem(this.parentForm.value['email'], jsonParent);
  }
}
