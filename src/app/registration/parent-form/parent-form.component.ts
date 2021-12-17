import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
})
export class ParentFormComponent implements OnInit {
  hidePassword = true;

  phoneRegx = /^\+?([0-9]{10,13})$/;

  parentForm!: FormGroup;

  addedNewStudents!: FormArray;

  addedExistingStudents!: FormArray;

  addStudents: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(this.phoneRegx)],
      ],
      password: ['', [Validators.required]],
      addedNewStudents: this.formBuilder.array([]),
      addedExistingStudents: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {}

  get arrayOfNewStudents(): FormArray {
    return this.parentForm.get('addedNewStudents') as FormArray;
  }

  get arrayOfExistingStudents(): FormArray {
    return this.parentForm.get('addedExistingStudents') as FormArray;
  }

  createNewStudent(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(this.phoneRegx)],
      ],
    });
  }

  createExistingStudent(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  addNewStudent(): void {
    this.addedNewStudents = this.parentForm.get(
      'addedNewStudents'
    ) as FormArray;
    this.addedNewStudents.push(this.createNewStudent());
  }

  deleteNewStudent(): void {
    this.addedNewStudents = this.parentForm.get(
      'addedNewStudents'
    ) as FormArray;
    this.addedNewStudents.removeAt(this.arrayOfNewStudents.length - 1);
  }

  addExistingStudent(): void {
    this.addedExistingStudents = this.parentForm.get(
      'addedExistingStudents'
    ) as FormArray;
    this.addedExistingStudents.push(this.createExistingStudent());
  }

  deleteExistingStudent(): void {
    this.addedExistingStudents = this.parentForm.get(
      'addedExistingStudents'
    ) as FormArray;
    this.addedExistingStudents.removeAt(
      this.arrayOfExistingStudents.length - 1
    );
  }

  clearStudents(): void {
    this.addedNewStudents = this.parentForm.get(
      'addedNewStudents'
    ) as FormArray;
    this.addedNewStudents.clear();

    this.addedExistingStudents = this.parentForm.get(
      'addedExistingStudents'
    ) as FormArray;
    this.addedExistingStudents.clear();
  }

  signUp() {
    const jsonData = JSON.stringify(this.parentForm.value);
    localStorage.setItem('registrationData', jsonData);
  }
}
