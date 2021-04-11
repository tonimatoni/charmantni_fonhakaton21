import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './question.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private geolocation: Geolocation, private fsAuth: AngularFireAuth, private auth: AuthService, private firestore: AngularFirestore, private alertController: AlertController, private questionService: QuestionService) {
    this.firestore.collection('questions').stateChanges(['added']).subscribe(async (change) => {
      try {
        if (change.length > 1) return true;
        const newQuestion = {
          ...change[0].payload.doc.data() as any,
          id: change[0].payload.doc.id
        }
        const alertD = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'UPITNIK',
          subHeader: 'Molimo Vas da nam odgovorite na sledeće pitanje',
          message: newQuestion.questionTitle,
          buttons: [{
            text: 'DA',
            handler: () => {

              this.geolocation.getCurrentPosition().then(async (resp) => {
                this.firestore.collection('answers').doc(`${(await this.auth.getCurrentUser()).id}-${newQuestion.id}`).set({
                  question: newQuestion,
                  answer: true,
                  userID: (await this.auth.getCurrentUser()).id,
                  lat: resp.coords.latitude,
                  log: resp.coords.longitude
                }, { merge: true })
              })
            }
          }, {
            text: 'NE', handler: () => {

              this.geolocation.getCurrentPosition().then(async (resp) => {
                this.firestore.collection('answers').doc(`${(await this.auth.getCurrentUser()).id}-${newQuestion.id}`).set({
                  question: newQuestion,
                  answer: false,
                  userID: (await this.auth.getCurrentUser()).id,
                  lat: resp.coords.latitude,
                  log: resp.coords.longitude
                }, { merge: true })
              })
            }
          }]

        });
        alertD.present();

        console.log(newQuestion)
      } catch (err) {
        console.log(err);
      }
    })
  }

  ngOnInit() {
    this.questionService.addAnswers();
  }


}
