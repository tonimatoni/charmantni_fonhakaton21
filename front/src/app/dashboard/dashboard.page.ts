import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './question.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

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
  constructor(private firestore: AngularFirestore, private questionService: QuestionService, private geolocation: Geolocation) { }

  ngOnInit() {
    this.questionService.addAnswers();
    this.loadMap();
  }


  loadMap() {
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
      new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: "Ovde si!",
      });

      const latLng1 = new google.maps.LatLng(resp.coords.latitude + 0.01, resp.coords.longitude + 0.01);
      console.log(resp.coords, latLng)
      new google.maps.Marker({
        position: latLng1,
        map: this.map,
        title: "Ovde s2i!",
      });

      this.firestore.collection('answers').snapshotChanges(['added']).subscribe((change) => {
        console.log(change);
        const markers = [];
        change.forEach((marker)=>{
          let markerData = marker.payload.doc.data() as any;
          const latlog = new google.maps.LatLng(markerData.lat, markerData.log);
          // console.log(markerData);
          markers.push(new google.maps.Marker({
            position: latlog,
            map: this.map,
            title: "Ovde s2i!",
          }));
        })
        console.log(markers)
        // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      })
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
