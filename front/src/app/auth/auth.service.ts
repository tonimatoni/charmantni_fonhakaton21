import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
declare const window;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  confirmationResult:any;
  constructor(private fsAuth: AngularFireAuth) { }

  async registerUser(phoneNumber, appVerifier){
    this.confirmationResult = await this.fsAuth.signInWithPhoneNumber(phoneNumber, appVerifier);
    
  }

  getConfirmationResult(){
    return this.confirmationResult;
  }
}
