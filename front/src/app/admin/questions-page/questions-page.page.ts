import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
  get emergencyID() {
    return this.questionCreateForm.get('emergencyID');
  }

  public errorMessages = {
    questionTitle: [
      { type: 'required', message: 'Morate uneti naziv pitanja' },
    ],
  }


  questionCreateForm = this.formBuilder.group({
    emergencyID: ['',
      [
        Validators.required,
      ]],
    questionTitle: ['',
      [
        Validators.required,
      ]]
  });

  allEmergencies: any;
  question: any;
  adminID: string;

  questions = [];
  constructor(private fsAuth: AngularFireAuth, private auth: AuthService, private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    fsAuth.onAuthStateChanged(() => {
      this.auth.getCurrentUser().then(data => {
        this.adminID = data.uid;
        // this.getQuestions().subscribe(async (questions) => {
        //   this.questions = questions;
        //   console.log(questions)
        // })
        this.getAllEmergencies().subscribe(async (allEmergencies) => {
          console.log(await allEmergencies)
          this.allEmergencies = await allEmergencies;
        })
      })
    })
  }

  async ngOnInit() {

  }

  public async submit() {
    const question = await this.firestore.collection('questions').add({ ...this.questionCreateForm.value, adminID: (await this.auth.getCurrentUser()).uid });

    this.questions.push({ ...this.questionCreateForm.value, id: question.id });
    this.questionCreateForm['controls']['questionTitle'].reset()
  }

  public async delete(questionID) {
    console.log(questionID);
    this.firestore.collection('questions').doc(questionID).delete();
    this.questions = this.questions.filter(q => q.id != questionID);
  }

  fetchQuestions(e) {
    console.log(e.target)
    this.getQuestions(e.target.value).subscribe(async (questions) => {
      this.questions = questions;
      console.log(questions)
    })
  }

  getAllEmergencies() {
    console.log(this.adminID)
    return this.firestore.collection(`emergencies`, (ref) => ref.where('adminID', '==', this.adminID)).get().pipe(
      map(ms => {
        return Promise.all(ms.docs.map(async md => {
          const emergency = md.data() as any;
          const municipality = await this.getMunicipilityByID(emergency.municipalityID)
          return {
            ...md.data() as any,
            municipality: { ...municipality.data() as any, id: municipality.id },
            id: md.id
          }
        }))
      }
      ))
  }

  municipality: any;

  async getMunicipilityByID(docId: string) {
    console.log(docId)
    if (typeof (docId) != 'undefined')
      return await this.firestore
        .doc(`municipalities/${docId}`)
        .ref
        .get()
  }

  getQuestions(emergencyID) {
    return this.firestore.collection(`questions`, (ref) => ref.where('adminID', '==', this.adminID).where('emergencyID', '==', emergencyID)).get().pipe(
      map(ms => ms.docs.map(md => ({
        ...md.data() as any,
        id: md.id
      })
      )
      )
    );
  }

}
