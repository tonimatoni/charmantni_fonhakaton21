import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {

  emergencies: any[];
  questions: [];
  currentUser;
  constructor(private geolocation: Geolocation, private fsAuth: AngularFireAuth, private auth: AuthService, private firestore: AngularFirestore) {
    fsAuth.onAuthStateChanged((user) => {
      auth.getCurrentUser().then((currentUser) => {
        console.log(currentUser);
        this.currentUser = currentUser;
        firestore.collection('emergencies', ref => ref.where('municipalityID', '==', currentUser.municipalityID)).get()
          .subscribe(allEmergencies => {
            console.log(allEmergencies.docs);
            this.emergencies = allEmergencies.docs.map(e => ({ ...e.data() as any, id: e.id }));
            firestore.collection('questions').get()
              .subscribe(allQuestions => {
                const questions = allQuestions.docs.map(e => ({ ...e.data() as any, id: e.id }));
                firestore.collection('answers', ref => ref.where('userID', '==', currentUser.id)).get()
                  .subscribe(userAnswersSnaps => {
                    const userAnswers = userAnswersSnaps.docs.map(e => ({ ...e.data() as any, id: e.id }));
                    for (let e of this.emergencies) {
                      e.questions = questions.filter(q => q.emergencyID === e.id).map(q => ({
                        ...q,
                        checked: (userAnswers.find(a => a.question.id === q.id)!==undefined) ? userAnswers.find(a => a.question.id === q.id).answer : false
                      }))
                    }
                  })
              })
          })
      })
    })
  }

  ngOnInit() { }

  checkoxChange(checkox, question) {

    this.geolocation.getCurrentPosition().then((resp) => {
    const isChecked = checkox.checked;
    this.firestore.collection('answers').doc(`${this.currentUser.id}-${question.id}`).set({
      question:question,
      answer: isChecked,
      userID:this.currentUser.id,
      lat:resp.coords.latitude,
      log:resp.coords.longitude
    }, { merge: true })
  })
}

}
