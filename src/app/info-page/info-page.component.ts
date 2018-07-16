import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from '../user.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

  user: User;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  selectedValue: number;

  doctypes: Doctype[] = [
    {value: 1, viewValue: 'Паспорт'},
    {value: 2, viewValue: 'Загран паспорт'},
    {value: 3, viewValue: 'Паспорт моряка'}
  ];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
      });
  }

}
