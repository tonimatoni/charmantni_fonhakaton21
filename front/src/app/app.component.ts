import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AlertController } from '@ionic/angular';
import { AuthService } from './auth/auth.service';
declare const window: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public alertController: AlertController,private auth: AuthService, private firestore: AngularFirestore, private fcm: AngularFireMessaging, private fsAuth: AngularFireAuth) {
    try {
      this.fsAuth.setPersistence('local');
      auth.getCurrentUser().then(currUser => {
        console.log(currUser);
        if (currUser)
          this.fcm.getToken
            .subscribe(
              async (token) => {
                await this.firestore.doc(`users/${currUser.id}`).set({
                  messagingToken: token
                }, { merge: true })
              },
              (error) => { console.error(error); },
            );
      })


      this.fcm.onMessage(async(payload) => {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Alert',
          subHeader: 'Subtitle',
          message: 'This is an alert message.',
          buttons: ['OK']
        });
      })
    } catch (err) {
        console.log(err);
      }
    }
}
