import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  statusEnums = {
    PENDING: 'POCINJE',
    STARTED: 'POCELA',
    FINISHED: 'ZAVRSE'
  }


  constructor() { }
}
