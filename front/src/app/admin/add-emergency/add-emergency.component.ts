import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmergencyService } from 'src/app/services/emergency.service';
import { MunicipilityService } from 'src/app/services/municipility.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

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

  constructor(private fsAuth:AngularFireAuth, private auth:AuthService, private municipalityService: MunicipilityService, private formBuilder: FormBuilder, private firestore: AngularFirestore, private emergencyService: EmergencyService) {
    
    municipalityService.getAllMunicipilities().subscribe((allMunicipilities) => {
      console.log(allMunicipilities);
      this.allMunicipilities = allMunicipilities.sort((a, b) => a.nOPS.localeCompare(b.nOPS));
    })
  
  }

  ngOnInit() {
  }

  public async submit() {
    try {
      const {municipalityID} = (await (await this.fsAuth.currentUser).getIdTokenResult()).claims
      await this.firestore
        .collection('emergencies')
        .add({
          ...this.emergencyCreateForm.value,
          adminID: (await this.auth.getCurrentUser()).uid,
          municipalityID
        })

      alert("Uspesno ste proglasili vanrednu sitauciju.")
    } catch (error) {
      alert("Nazalost je doslo do greske, pokusajte ponovo.")
    }
  }

  public toggleShow() {
    this.show = !this.show;
  }
}
