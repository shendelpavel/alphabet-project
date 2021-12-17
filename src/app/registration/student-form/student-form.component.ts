import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  hidePassword = true;

  phoneRegx = /^\+?([0-9]{10,13})$/;

  studentForm!: FormGroup;

  addedParents!: FormArray;

  addParents: boolean = false;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(this.phoneRegx)],
      ],
      password: ['', [Validators.required]],
      addedParents: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {}

  get arrayOfParents(): FormArray {
    return this.studentForm.get('addedParents') as FormArray;
  }

  createParent(result: string): FormGroup {
    return this.formBuilder.group({
      email: [result, [Validators.required, Validators.email]],
    });
  }

  addParent(): void {
    if (this.arrayOfParents.controls[0]) {
    }
    const dialogRef = this.dialog.open(DialogAddParent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedParents = this.studentForm.get('addedParents') as FormArray;
        this.addedParents.push(this.createParent(result));
      }
    });
  }

  deleteParent(index: number): void {
    this.arrayOfParents.removeAt(index);
  }

  clearParents(): void {
    this.addedParents = this.studentForm.get('addedParents') as FormArray;
    this.addedParents.clear();
  }

  signUp() {
    const jsonData = JSON.stringify(this.studentForm.value);
    localStorage.setItem('registrationData', jsonData);
  }
}

@Component({
  selector: 'dialog-add-parent',
  templateUrl: './additional-components/dialog-add-parent.html',
})
export class DialogAddParent {
  parentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddParent>,
    private formBuilder: FormBuilder
  ) {
    this.parentForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
