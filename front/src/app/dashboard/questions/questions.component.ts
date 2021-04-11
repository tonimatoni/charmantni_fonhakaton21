import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {

  emergencies:[];
  questions:[];
  constructor(private auth: AuthService, private firestore: AngularFirestore) {
    auth.getCurrentUser().then((currentUser)=>{
      firestore.collection('emergencies').where('municipalityID', '==', currentUser.municipalityID)
    })
   }

  ngOnInit() {}

}
