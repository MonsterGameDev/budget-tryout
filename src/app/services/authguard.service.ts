import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterExtensions} from 'nativescript-angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate{
 
    canActivate() {
        if (this.loginService.isUserLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login'] )
        }
    }

    constructor(private loginService: LoginService, private router: RouterExtensions) { }
}