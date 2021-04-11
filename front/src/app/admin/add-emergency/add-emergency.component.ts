import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmergencyService } from 'src/app/services/emergency.service';
import { MunicipilityService } from 'src/app/services/municipility.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-emergency',
  templateUrl: './add-emergency.component.html',
  styleUrls: ['./add-emergency.component.scss'],
})
export class AddEmergencyComponent implements OnInit {

  get advice() {
    return this.emergencyCreateForm.get('advice');
  }
  get emergencyType() {
    return this.emergencyCreateForm.get('emergencyType');
  }
  get status() {
    return this.emergencyCreateForm.get('status');
  }

  public errorMessages = {
    advice: [
      { type: 'required', message: 'Unesite predlog mera zastite' },
    ],
    emergencyType: [
      { type: 'required', message: 'Morate uneti tip situacije' },
    ],
    status: [
      { type: 'required', message: 'Morate uneti status' }
    ],
  }


  emergencyCreateForm = this.formBuilder.group({
    emergencyType: ['',
      [
        Validators.required,
      ]],
    advice: ['',
      [Validators.required,
      ]],
    status: ['',
      [Validators.required]]
  });

  show = false;
  allMunicipilities: any[];
  allEmergencies: any;
  adminID: string;
  constructor(private fsAuth: AngularFireAuth, private auth: AuthService, private municipalityService: MunicipilityService, private formBuilder: FormBuilder, private firestore: AngularFirestore, private emergencyService: EmergencyService) {
    fsAuth.onAuthStateChanged(() => {
      this.auth.getCurrentUser().then(data => {
        this.adminID = data.uid;
        // this.getQuestions().subscribe(async (questions) => {
        //   this.questions = questions;
        //   console.log(questions)
        // })
        this.getAllEmergencies().subscribe(async (allEmergencies) => {
          this.allEmergencies = await allEmergencies;
          console.log(this.allEmergencies)
        })
      })
      municipalityService.getAllMunicipilities().subscribe((allMunicipilities) => {
        console.log(allMunicipilities);
        this.allMunicipilities = allMunicipilities.sort((a, b) => a.nOPS.localeCompare(b.nOPS));
      })

    })
  }

  ngOnInit() {
  }

  getColor(status) {
    switch (status) {
      case this.emergencyService.statusEnums.PENDING:
        return 'warning'
        break;
      case this.emergencyService.statusEnums.FINISHED:
        return 'success'
        break;

      default:
        return 'danger'
        break;
    }
  }

  public async submit() {
    try {
      const { municipalityID } = (await (await this.fsAuth.currentUser).getIdTokenResult()).claims
      const municipality = await this.getMunicipilityByID(municipalityID)
      await this.firestore
        .collection('emergencies')
        .add({
          ...this.emergencyCreateForm.value,
          adminID: (await this.auth.getCurrentUser()).uid,
          municipalityID
        });
      this.allEmergencies.push({
        municipality: { ...municipality.data() as any, id: municipality.id },
        ...this.emergencyCreateForm.value,
        adminID: (await this.auth.getCurrentUser()).uid,
        municipalityID
      })
      console.log(this.allEmergencies)

      alert("Uspesno ste proglasili vanrednu sitauciju.")
    } catch (error) {
      alert("Nazalost je doslo do greske, pokusajte ponovo.")
    }
  }

  public toggleShow() {
    this.show = !this.show;
  }

  getAllEmergencies() {
    console.log(this.adminID)
    return this.firestore.collection(`emergencies`).get().pipe(
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


}
