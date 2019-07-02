import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'ns-login-ex',
  templateUrl: './login-ex.component.html',
  styleUrls: ['./login-ex.component.css'],
  moduleId: module.id,
})
export class LoginExComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

}
