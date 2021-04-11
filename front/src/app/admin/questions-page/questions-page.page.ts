import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

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

  allEmergencies: any;

  questions = [];
  constructor(private auth: AuthService, private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.getAllEmergencies().subscribe((allEmergencies) => {
      this.allEmergencies = allEmergencies;
    })
  }

  ngOnInit() {
  }

  public async submit() {
    const question = await this.firestore.collection('questions').add({ ...this.questionCreateForm.value, adminID: (await this.auth.getCurrentUser()).uid });

    this.questions.push({ ...this.questionCreateForm.value, id: question.id });
    this.questionCreateForm.reset();
  }

  public async delete(questionID) {
    console.log(questionID);
    this.firestore.collection('questions').doc(questionID).delete();
    this.questions = this.questions.filter(q => q.id != questionID);
  }

  getAllEmergencies() {
    return this.firestore.collection(`emergencies`).get().pipe(
      map(ms => ms.docs.map(md => ({
        ...md.data() as any,
        id: md.id
      })
      )
      ));
  }




}
