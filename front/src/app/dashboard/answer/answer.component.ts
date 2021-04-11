import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  answerTextFormControl: FormControl;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.answerTextFormControl = new FormControl('', []);
  }
  async submit() {
    await this.firestore.collection('answers').add({
      text: this.answerTextFormControl.value,
      lat: 20 + Math.random() * (0.05 - 0 + 0.01),
      log: 20 + Math.random() * (0.05 - 0 + 0.01),

    })
  }
}
