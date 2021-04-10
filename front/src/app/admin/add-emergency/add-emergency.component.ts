import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
  }

  public submit() {
    console.log(this.emergencyCreateForm.value)
  }

  public toggleShow() {
    console.log("test")
    this.show = !this.show;
  }
}
