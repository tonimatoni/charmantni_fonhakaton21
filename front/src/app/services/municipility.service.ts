import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MunicipilityService {

  constructor(private firestore: AngularFirestore) { }

  getAllMunicipilities() {
    return this.firestore.collection(`municipalities`).get().pipe(
      map(ms => ms.docs.map(md => ({
        ...md.data() as any,
        id: md.id
      })
      )
      ));
  }
}
