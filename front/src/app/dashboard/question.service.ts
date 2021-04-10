import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private firestore: AngularFirestore) {

  }

  addAnswers(){
    return this.firestore.doc('test/test').set({
      test:'test'
    })
  }
}
