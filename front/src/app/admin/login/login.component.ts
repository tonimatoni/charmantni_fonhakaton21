import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  public errorMessages = {
    phoneNumber: [
      { type: 'required', message: 'Morate uneti broj telefona' },
      { type: 'pattern', message: 'Unesite validan broj telefona' }
    ],
    email: [
      { type: 'required', message: 'Morate uneti email' },
      { type: 'pattern', message: 'Email nije dobro unet' }
    ],
    password: [
      { type: 'required', message: 'Morate uneti password' }
    ],
  }


  registrationForm = this.formBuilder.group({
    email: ['',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]],
    phoneNumber: ['',
      [Validators.required,

      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'),]],
    password: ['',
      [Validators.required]]
  });
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
  }

  public submit() {
    console.log(this.registrationForm.value)
  }
}
