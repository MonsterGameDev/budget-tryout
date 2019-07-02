import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { TextField } from 'tns-core-modules/ui/text-field';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';
import { RouterExtensions } from  'nativescript-angular/router'

import { IUser, User } from './../shared/models/user.interface';
import { ValidateEmail } from './../shared/validators/email.validator';
import { LoginService } from '../services/login.service';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.common.css', './login.css'],
    moduleId: module.id
})
export class LoginComponent implements OnInit {
    @ViewChild('password', { static: true }) passwordField: ElementRef;

    public loginForm: FormGroup;
    public emailErrMsg;
    public passwordErrMsg;

    private emailErrorMessages: any;
    private passwordErrorMessages: any;

    private emailFieldControl: AbstractControl;
    private passwordFieldControl: AbstractControl;

    public hideIcon = String.fromCharCode(0xf070);
    public showIcon = String.fromCharCode(0xf06e);
    public showHideIcon: any;
    private showPassword = false;

    isAuthenticating = false;

    constructor(
        private page: Page,
        private fb: FormBuilder,
        private loginService: LoginService,
        private router: RouterExtensions
        ) {}

    ngOnInit() {
        this.setPageBackground();

        this.initializeLoginForm();
        this.setupErrorMessages();
        this.getFieldControls();
        this.setupValueChangeListeners();

        this.showHideIcon = this.hideIcon;
    }

    private initializeLoginForm() {
        this.loginForm = this.fb.group({
            email: ['',{ 
              validators: [Validators.required, ValidateEmail],
              updateOn: 'blur'
            }],
            password: ['', [Validators.required]]}
        );
    }

    private setupErrorMessages() {
        this.emailErrorMessages = {
            required: 'email skal udfyldes',
            validateEmail: 'email ikke valid',
        };
        this.passwordErrorMessages = {
            required: 'password skal udfyldes'
        };
    }

    private getFieldControls() {
        this.emailFieldControl = <AbstractControl>this.loginForm.get('email');
        this.passwordFieldControl = <AbstractControl>(
            this.loginForm.get('password')
        );
    }

    private setupValueChangeListeners() {
        this.emailFieldControl.valueChanges.subscribe(() =>
            this.emailFieldValidityCheck(this.emailFieldControl)
        );

        this.passwordFieldControl.valueChanges.subscribe(() =>
            this.passwordFieldValidityCheck(this.passwordFieldControl)
        );
    }

    // Validity Checks...
    emailFieldValidityCheck(c: AbstractControl) {
      this.emailErrMsg = null;
        if (c.dirty && !!c.errors) {
          
          this.emailErrMsg = Object.keys(c.errors)
                .map(key => this.emailErrorMessages[key] + ' ')
                .toString();
        }
        
    }

    passwordFieldValidityCheck(c: AbstractControl) {
        this.passwordErrMsg = null;
        if (c.dirty && !!c.errors) {
            this.passwordErrMsg = Object.keys(c.errors)
                .map(key => this.passwordErrorMessages[key])
                .toString();
        }
    }

    private setPageBackground() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = 'res://gold_bg';
        this.page.style.backgroundSize = 'cover';
        this.page.style.backgroundRepeat = 'no-repeat';
    }

    showHidePassword() {
        this.showPassword = !this.showPassword;
        this.showHideIcon = this.showPassword ? this.showIcon : this.hideIcon;
        let passField: TextField = <TextField>this.passwordField.nativeElement;
        passField.secure = !passField.secure;
    }

    onsubmit() {
        debugger;
         if(this.loginForm.valid){
            this.isAuthenticating = true;

            const value = this.loginForm.value;
            const loginRequest = new User(value.email, value.email, value.password);

            this.loginService.login(loginRequest).subscribe(() => {
                this.isAuthenticating = false;
                this.router.navigate(['/home', { clearHistory: true}])
            },
            (err) => console.log('Error: ' + err)
            );

         }
    }
}
