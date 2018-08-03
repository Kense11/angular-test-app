import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { Doctype } from '../models/doctype';
import { DialogComponent } from '../dialog/dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();

  updateForm: FormGroup;

  user: User;

  doctypes: Doctype[] = [
    {value: 1, viewValue: 'Паспорт'},
    {value: 2, viewValue: 'Загран паспорт'},
    {value: 3, viewValue: 'Паспорт моряка'}
  ];

  static validateDate(control: AbstractControl) {
    if (!moment(control.value, 'DD-MM-YYYY').isValid() ||
      moment(control.value, 'DD-MM-YYYY').unix() <
      moment('01.01.1991', 'DD-MM-YYYY').unix()) {
      return {validDate: true};
    }
    return null;
  }

  constructor(private fb: FormBuilder, private userService: UserService, public dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit() {
    this.getUser('78345544322');
  }

  getUser(msisdn): void {
    this.subscriptions.add(
      this.userService.getUser(msisdn)
        .subscribe(user => {
          this.user = user;
        })
    );
  }

  copyFormValue(flag: string): void {
    switch (flag) {
      case 'surname':
        this.updateForm.controls['surname'].setValue(this.user.surname);
        break;
      case 'doctype':
        this.updateForm.controls['doctype'].setValue(this.user.doctype);
        break;
      case 'country':
        this.updateForm.controls['country'].setValue(this.user.country);
        break;
      case 'date':
        this.updateForm.controls['date'].setValue(this.user.date);
        break;
      case 'seriesNumber':
        this.updateForm.controls['seriesNumber'].setValue(this.user.seriesNumber);
        break;
      case 'code':
        this.updateForm.controls['code'].setValue(this.user.code);
        break;
      case 'authority':
        this.updateForm.controls['authority'].setValue(this.user.authority);
        break;
      case 'address':
        this.updateForm.controls['address'].setValue(this.user.address);
        break;
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent);
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
        InfoPageComponent.validateDate
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
