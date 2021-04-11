import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
declare const window;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  confirmationResult: any;
  constructor(private fsAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  async registerUser(phoneNumber, appVerifier) {
    this.confirmationResult = await this.fsAuth.signInWithPhoneNumber(phoneNumber, appVerifier);
    
  }

  getConfirmationResult() {
    return this.confirmationResult;
  }

  async getCurrentUser() {
    const user = await this.fsAuth.currentUser;
    const userSnap = await this.firestore.doc(`users/${user.uid}`).get().toPromise();
    if (userSnap.exists)
      return {
        ...userSnap.data() as any,
        id: userSnap.id
      }
    else return user;
      
  }
}
