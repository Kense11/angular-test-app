import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import { UserService } from '../user.service';
import * as moment from 'moment';


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

  constructor(private fb: FormBuilder, private userService: UserService) {
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
        Validators.maxLength(50),
        Validators.pattern('[а-яА-я]*')
      ]],
      doctype: '',
      country: ['', [
        Validators.maxLength(50),
        Validators.pattern('[а-яА-я]*')
      ]],
      date: ['', [
        Validators.pattern('[0-9]{2}[.][0-9]{2}[.][0-9]{4}'),
        this.validateDate
      ]]
    });
  }

  validateDate(control: AbstractControl) {
    return !moment(control.value, 'MM-DD-YYYY').isValid();
  }

}

// doctype: 1,
//   country: 'Россия',
//   date: 733449600000,
//   seriesNumber: '1234 567890',
//   code: 12345,
//   authority: 'уфмс блабла.,',
//   address: 'г краснодар бла бла 2,.'
