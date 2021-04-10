import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

 questionTypeEnum = {
   YES_NO: 'Da/Ne',
  //  SLIDER: 'Slider',
 }

  constructor() { }
}
