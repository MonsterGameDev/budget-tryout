import { Injectable } from "@angular/core";

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

  public login(userLogin: User): Observable<number | void> {
     return timer(1000).pipe(tap(() => {
        if (userLogin.email === 'per@qwert.dk' && userLogin.password === 'hello'){
            this.user = JSON.stringify(userLogin);
        } else {
            throwError('unknown username or password');
        }
    }));
  }

  logout(): Observable<number | void> {
    return timer(1000).pipe(tap(() => this.user=''));
  }

  private get user(): string {
    return getString(_CURRENT_USER);
  }

  private set user(theToken: string) {
    setString(_CURRENT_USER, theToken);
  }
}