import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
declare const window;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  confirmationResult:any;
  constructor(private fsAuth: AngularFireAuth) { }

  registerUser(phoneNumber, appVerifier){
    this.fsAuth.signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      this.confirmationResult = confirmationResult;
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      // window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      console.log(error);
      // Error; SMS not sent
      // ...
    });
  }

  getConfirmationResult(){
    return this.confirmationResult;
  }
}
