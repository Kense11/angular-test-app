import { Injectable } from '@angular/core';
import { User } from './user';
import { USER } from './mock user';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()

export class UserService {

  constructor() { }

  getUser(): Observable<User> {
    return of(USER);
  }

}
