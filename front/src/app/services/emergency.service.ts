import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmergencyService {
  statusEnums = {
    PENDING: 'UPOZORENJE',
    STARTED: 'POČETAK',
    FINISHED: 'KRAJ',
  };

  constructor() {}
}
