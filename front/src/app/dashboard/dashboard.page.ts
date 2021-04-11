import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './question.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor( private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.addAnswers();
  }


}
