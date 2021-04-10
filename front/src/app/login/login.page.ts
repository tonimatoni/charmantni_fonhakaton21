import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MunicipilityService } from '../services/municipility.service';
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
  loginFormGroup: FormGroup;
  allMunicipilities: any[];
  constructor(private firestore: AngularFirestore, private fcm: AngularFireMessaging, private router: Router, private win: WindowService, private fsAuth: AngularFireAuth, private auth: AuthService, private municipalityService: MunicipilityService) {
    municipalityService.getAllMunicipilities().subscribe((allMunicipilities) => {
      console.log(allMunicipilities);
      this.allMunicipilities = allMunicipilities.sort((a, b) => a.nOPS.localeCompare(b.nOPS));
    })
  }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      jmbg: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]),
      smsCode: new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]),
      municipality: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    })

  }

  register() {
    this.windowRef = this.win.windowRef
    if (this.loginFormGroup.valid) {
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'callback': async (response) => {
          await this.auth.registerUser('+381604818400', this.windowRef.recaptchaVerifier);
        }
      });
      this.windowRef.recaptchaVerifier.render()
    } else {
      for (const c of Object.values(this.loginFormGroup.controls)) {
        c.markAllAsTouched();
      }
    }
  }

  verifyCode() {
    const confirmationResult = this.auth.getConfirmationResult();
    if (this.loginFormGroup.valid && confirmationResult) {
      confirmationResult.confirm(this.loginFormGroup.controls.smsCode.value).then((result) => {
        // User signed in successfully.
        const user = result.user;

        //Store messaging token in firestore
        this.fcm.getToken
          .subscribe(
            async (token) => {
              await this.firestore.doc(`users/${user.uid}`).set({
                messagingToken: token
              }, { merge: true })
            },
            (error) => { console.error(error); },
          );

        this.fcm.onMessage((payload) => {
          console.log('Message received. ', payload);
        });
        
        this.router.navigateByUrl('');

      }).catch((error) => {
        console.log(error)
      });
    } else {

    }
  }

}
