import { Injectable } from "@angular/core";

import {User as KinveyUser} from'kinvey-nativescript-sdk';

import { getString, setString } from "tns-core-modules/application-settings";

import { User } from "./../shared/models/user.interface";
import { timer, Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";


const _CURRENT_USER = "_CURRENT_USER";

@Injectable()
export class LoginService {

  public isUserLoggedIn(): boolean {
    return !!this.user;
  }

  // public login(userLogin: User): Observable<number | void> {
  //    return timer(3000).pipe(tap(() => {
  //       if (userLogin.email === 'per@qwert.dk' && userLogin.password === 'hello'){
  //           this.user = JSON.stringify(userLogin);
  //       } else {
  //           throwError('unknown username or password');
  //       }
  //   }));
  // }

  public login(user: User) {
    let _user: KinveyUser = KinveyUser.getActiveUser();
    if (_user) {
      return KinveyUser.logout().then(() => {
        this.performLogin(user);
      });
    }
    else {
      this.performLogin(user);
    }
  }

  logout() {
    return KinveyUser.logout().then(() => {
      this.user = '';
    });
    
  }

  private performLogin(user: User) {
    return KinveyUser.login(user.email, user.password)
      .then((_user: any) => {
        // setting the 
        this.user = JSON.stringify(_user);
      });
  }


  // logout(): Observable<number | void> {
  //   return timer(1000).pipe(tap(() => this.user=''));
  // }

  private get user(): string {
    return getString(_CURRENT_USER);
  }

  private set user(theToken: string) {
    setString(_CURRENT_USER, theToken);
  }
}