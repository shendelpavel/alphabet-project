import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  statuses = ['Parent', 'Student'];

  formVariant: string = '';

  constructor() {}

  ngOnInit(): void {}
}
