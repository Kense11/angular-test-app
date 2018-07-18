import { Injectable } from '@angular/core';
import { User } from './user'
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { USERS} from './mock users';

@Injectable()

export class UserService {
  users = USERS;

  constructor() { }

  getUser(msisdn: string): Observable<User> {
    return of(this.users[msisdn]);
  }

}
