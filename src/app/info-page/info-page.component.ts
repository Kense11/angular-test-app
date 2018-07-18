import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import { UserService } from '../user.service';
import * as moment from 'moment';
import {MatDialog} from '@angular/material';


export interface Doctype {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {

  updateForm: FormGroup;

  user: User;

  doctypes: Doctype[] = [
    {value: 1, viewValue: 'Паспорт'},
    {value: 2, viewValue: 'Загран паспорт'},
    {value: 3, viewValue: 'Паспорт моряка'}
  ];

  constructor(private fb: FormBuilder, private userService: UserService, public dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
      });
  }

  createForm() {
    this.updateForm = this.fb.group({
      surname: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('[а-яА-ЯёЁ]*')
      ]],
      doctype: ['', [
        Validators.required
      ]],
      country: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('[а-яА-ЯёЁ]*')
      ]],
      date: ['', [
        Validators.required,
        Validators.pattern('[0-9]{2}[.][0-9]{2}[.][0-9]{4}'),
        this.validateDate
      ]],
      seriesNumber: ['', [
        Validators.required,
        Validators.pattern('[0-9]{4} [0-9]{6}')
      ]],
      code: ['', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.maxLength(20),
      ]],
      authority: ['', [
        Validators.required,
        Validators.pattern('[?!,.а-яА-ЯёЁ\\s]*'),
        Validators.maxLength(20),
      ]],
      address: ['', [
        Validators.required,
        Validators.pattern('[?!,.а-яА-ЯёЁ0-9\\s]*'),
        Validators.maxLength(20),
      ]]
    });
  }

  validateDate(control: AbstractControl) {
    if (!moment(control.value, 'DD-MM-YYYY').isValid() ||
      moment(control.value, 'DD-MM-YYYY').unix() <
      moment('01.01.1991', 'DD-MM-YYYY').unix()) {
      return {validDate: true};
    }
    return null;
  }

  openDialog() {
    this.dialog.open(DialogComponent);

  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'app-dialog.html',
  styles: ['.mat-dialog-actions { justify-content: center; }']
})
export class DialogComponent {}
