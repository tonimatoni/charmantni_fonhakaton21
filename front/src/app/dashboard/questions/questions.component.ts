import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {

  emergencies: any[];
  questions: [];
  constructor(private fsAuth: AngularFireAuth, private auth: AuthService, private firestore: AngularFirestore) {
    fsAuth.onAuthStateChanged((user) => {
      auth.getCurrentUser().then((currentUser) => {
        console.log(currentUser);
        firestore.collection('emergencies', ref => ref.where('municipalityID', '==', currentUser.municipalityID)).get()
          .subscribe(allEmergencies => {
            console.log(allEmergencies.docs);
            this.emergencies = allEmergencies.docs.map(e => ({ ...e.data() as any, id: e.id }))
          })
      })
    })
  }

  ngOnInit() { }

}
