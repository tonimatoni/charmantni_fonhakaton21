import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
  constructor(private win: WindowService, private fsAuth: AngularFireAuth, private auth: AuthService) { }

  ngOnInit() {
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

  verifyCode(){
    confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

}
