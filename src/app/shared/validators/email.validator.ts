import { AbstractControl } from "@angular/forms";

let  validator = require('email-validator');

export function ValidateEmail(c: AbstractControl){
    
    if (!validator.validate(c.value)) {
        return { validateEmail: true};
    }
    
    return null;
}