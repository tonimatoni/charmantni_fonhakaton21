import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './question.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;
  constructor(private questionService:QuestionService, private geolocation: Geolocation) { }

  ngOnInit() {
    this.questionService.addAnswers();
  }


  loadMap(lat, lon) {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      // this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      // this.map.addListener('dragend', () => {

      //   this.latitude = this.map.center.lat();
      //   this.longitude = this.map.center.lng();

      //   this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      // });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
