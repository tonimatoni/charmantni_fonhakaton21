import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss'],
})
export class UserFooterComponent implements OnInit {
  poruke = 2;
  constructor(private firestore: AngularFirestore) {
    const markers = [];
    this.firestore.collection('questions').snapshotChanges(['added', 'modified']).subscribe((change) => {
      this.poruke = change.length;
    })
  }

  ngOnInit() { }
}
