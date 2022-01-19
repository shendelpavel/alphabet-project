import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PasswordConfirmValidator } from '../../validators/password-confirm.validator';
import { EmailInUseValidator } from '../validators/email-in-use.validator';
import { DialogAddExistingStudent } from './dialogs/add-existing-student/add-existing-student.component';
import { DialogAddNewStudent } from './dialogs/add-new-student/add-new-student.component';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DataService } from 'src/app/services/data.service';
import {
  EMAIL_PATTERN_REGEX,
  PHONE_PATTERN_REGEX,
} from '../regular-expressions';
import { forEach } from 'lodash';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
})
export class ParentFormComponent implements OnInit {
  private readonly MIN_HORIZONTAL_STEPPER_SCREEN: number = 1440;

  public stepperOrientation: StepperOrientation = 'horizontal';
  public hidePassword = true;
  public hideConfirmPassword = true;
  public parentForm!: FormGroup;

  private screenWidth: number = 0;
  private addedNewStudents!: FormArray;
  private addedExistingStudents!: FormArray;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.parentForm = this.formBuilder.group(
      {
        role: ['parent'],
        isLoggedIn: [false],
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.pattern(EMAIL_PATTERN_REGEX)],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(PHONE_PATTERN_REGEX)],
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        addedNewStudents: this.formBuilder.array([]),
        addedExistingStudents: this.formBuilder.array([]),
      },
      {
        validator: [
          PasswordConfirmValidator('password', 'confirmPassword'),
          EmailInUseValidator('email', this.dataService.getUserData),
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

  public get newStudentsList(): FormArray {
    return this.parentForm.get('addedNewStudents') as FormArray;
  }

  public get existingStudentsList(): FormArray {
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
        this.addedNewStudents = this.newStudentsList;
        this.addedNewStudents.push(result);
      }
    });
  }

  public editNewStudent(index: number): void {
    const dialogRef = this.dialog.open(DialogAddNewStudent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedNewStudents = this.newStudentsList;
        this.addedNewStudents.at(index).patchValue(result.value);
      }
    });
  }

  public deleteNewStudent(index: number): void {
    this.addedNewStudents = this.newStudentsList;
    this.addedNewStudents.removeAt(index);
  }

  public addExistingStudent(): void {
    const dialogRef = this.dialog.open(DialogAddExistingStudent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedExistingStudents = this.existingStudentsList;
        this.addedExistingStudents.push(result);
      }
    });
  }

  public editExistingStudent(index: number): void {
    const dialogRef = this.dialog.open(DialogAddExistingStudent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedExistingStudents = this.existingStudentsList;
        this.addedExistingStudents.at(index).patchValue(result.value);
      }
    });
  }

  public deleteExistingStudent(index: number): void {
    this.addedExistingStudents = this.existingStudentsList;
    this.addedExistingStudents.removeAt(index);
  }

  public resetForm(): void {
    this.addedNewStudents = this.newStudentsList;
    this.addedNewStudents.clear();
    this.addedExistingStudents = this.existingStudentsList;
    this.addedExistingStudents.clear();
    this.parentForm.reset();
  }

  public signUp(): void {
    forEach(this.newStudentsList.value, (studentData) => {
      const { ...newStudent } = studentData;
      this.dataService.setStudentData(newStudent);
    });
    const { confirmPassword, ...newParent } = this.parentForm.value;
    this.dataService.setParentData(newParent);
  }

  private setStepperOrientation(): void {
    if (this.screenWidth < this.MIN_HORIZONTAL_STEPPER_SCREEN) {
      this.stepperOrientation = 'vertical';
    } else {
      this.stepperOrientation = 'horizontal';
    }
  }
}
