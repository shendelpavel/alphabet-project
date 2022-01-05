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
import { DialogAddExistingStudent } from './dialogs/add-existing-student/add-existing-student.component';
import { DialogAddNewStudent } from './dialogs/add-new-student/add-new-student.component';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
})
export class ParentFormComponent implements OnInit {
  readonly MIN_HORIZONTAL_STEPPER_SCREEN: number = 1440;
  readonly EMAIL_PATTERN_REGEX =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  readonly PHONE_PATTERN_REGEX = /^\+?([0-9]{10,13})$/;

  private screenWidth: number = 0;
  private addedNewStudents!: FormArray;
  private addedExistingStudents!: FormArray;

  public stepperOrientation: StepperOrientation = 'horizontal';
  public hidePassword = true;
  public hideConfirmPassword = true;
  public parentForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.parentForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.pattern(this.EMAIL_PATTERN_REGEX)],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(this.PHONE_PATTERN_REGEX)],
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
  private onWindowResize(): void {
    this.screenWidth = window.innerWidth;
    this.setStepperOrientation();
  }

  private setStepperOrientation(): void {
    if (this.screenWidth < this.MIN_HORIZONTAL_STEPPER_SCREEN) {
      this.stepperOrientation = 'vertical';
    } else {
      this.stepperOrientation = 'horizontal';
    }
  }

  public get arrayOfNewStudents(): FormArray {
    return this.parentForm.get('addedNewStudents') as FormArray;
  }

  public get arrayOfExistingStudents(): FormArray {
    return this.parentForm.get('addedExistingStudents') as FormArray;
  }

  public checkControlErrors(controlName: string): boolean {
    const control: FormControl = this.parentForm.get(
      controlName
    ) as FormControl;
    return control.invalid && control.touched;
  }

  public addNewStudent(): void {
    const dialogRef = this.dialog.open(DialogAddNewStudent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedNewStudents = this.arrayOfNewStudents;
        this.addedNewStudents.push(result);
      }
    });
  }

  public editNewStudent(index: number): void {
    const dialogRef = this.dialog.open(DialogAddNewStudent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedNewStudents = this.arrayOfNewStudents;
        this.addedNewStudents.at(index).patchValue(result.value);
      }
    });
  }

  public deleteNewStudent(index: number): void {
    this.addedNewStudents = this.arrayOfNewStudents;
    this.addedNewStudents.removeAt(index);
  }

  public addExistingStudent(): void {
    const dialogRef = this.dialog.open(DialogAddExistingStudent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedExistingStudents = this.arrayOfExistingStudents;
        this.addedExistingStudents.push(result);
      }
    });
  }

  public editExistingStudent(index: number): void {
    const dialogRef = this.dialog.open(DialogAddExistingStudent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedExistingStudents = this.arrayOfExistingStudents;
        this.addedExistingStudents.at(index).patchValue(result.value);
      }
    });
  }

  public deleteExistingStudent(index: number): void {
    this.addedExistingStudents = this.arrayOfExistingStudents;
    this.addedExistingStudents.removeAt(index);
  }

  public resetForm(): void {
    this.addedNewStudents = this.arrayOfNewStudents;
    this.addedNewStudents.clear();
    this.addedExistingStudents = this.arrayOfExistingStudents;
    this.addedExistingStudents.clear();
    this.parentForm.reset();
  }

  public signUp(): void {
    if (this.arrayOfNewStudents.length > 0) {
      for (let newStudent of this.arrayOfNewStudents.controls) {
        this.dataService.setUserData(newStudent.value);
      }
    }
    delete this.parentForm.value.confirmPassword;
    this.dataService.setUserData(this.parentForm.value);
  }
}
