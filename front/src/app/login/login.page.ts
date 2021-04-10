import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { WindowService } from '../services/window.service';
declare const firebase;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  windowRef: any;
  smsCode: FormControl;
  confirmation
  constructor(private win: WindowService, private fsAuth: AngularFireAuth, private auth: AuthService) { }

  ngOnInit() {
    this.smsCode = new FormControl('', [Validators.minLength(6), Validators.maxLength(6)])
  }

  register() {
    this.windowRef = this.win.windowRef
    alert();
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.auth.registerUser('+381641377201', this.windowRef.recaptchaVerifier);
      }
    });
    this.windowRef.recaptchaVerifier.render()
  }

  verifyCode() {
    const confirmationResult = this.auth.getConfirmationResult();
    console.log(this.smsCode.valid, confirmationResult) 
    if(this.smsCode.valid && confirmationResult){
      confirmationResult.confirm(this.smsCode.value).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user); 
        // ...
      }).catch((error) => {
        console.log(error) 
        // User couldn't sign in (bad verification code?)
        // ...
      });
    }else{

    }
  }

}
