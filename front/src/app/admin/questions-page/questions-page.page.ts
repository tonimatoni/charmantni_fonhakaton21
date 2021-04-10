import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.page.html',
  styleUrls: ['./questions-page.page.scss'],
})
export class QuestionsPagePage implements OnInit {
  get questionTitle() {
    return this.questionCreateForm.get('questionTitle');
  }
  // get questionType() {
  //   return this.questionCreateForm.get('questionType');
  // }

  public errorMessages = {
    questionTitle: [
      { type: 'required', message: 'Morate uneti naziv pitanja' },
    ],
  }


  questionCreateForm = this.formBuilder.group({
    // questionType: ['',
    //   [
    //     Validators.required,
    //   ]],
    questionTitle: ['',
      [
        Validators.required,
      ]]
  });

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore) {

  }

 async ngOnInit() {
    
  }

  public submit() {
    console.log(this.questionCreateForm.value)
  }

}
