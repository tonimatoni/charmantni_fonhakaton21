import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;
  constructor(private firestore: AngularFirestore, private geolocation: Geolocation) { }

  ngOnInit() {
    this.loadMap();
  }



  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      // this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      const markers = [];
      this.firestore.collection('answers').snapshotChanges(['added', 'modified']).subscribe((change) => {
        markers.forEach(m => m.setMap(null))
        groupBy('userID', change.map(m => {
          let aData = m.payload.doc.data() as any;
          return {
            questionID: aData.question.id,
            ...aData
          }
        })).forEach((markerData) => {
          console.log(markerData)
          const isHelpNeeded = markerData.items.reduce((needsHelp, m)=>(needsHelp)?true:m.answer,false)
          var pinImage = (isHelpNeeded) ? new google.maps.MarkerImage("http://www.googlemapsmarkers.com/v1/FF0000/") : new google.maps.MarkerImage("http://www.googlemapsmarkers.com/v1/0000FF/");

          const latlog = new google.maps.LatLng(markerData.items[0].lat, markerData.items[0].log);
          // console.log(markerData);
          markers.push(new google.maps.Marker({
            position: latlog,
            map: this.map,
            icon: pinImage,
            title: "Ovde s2i!",
          }));
        })
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

function groupBy(key, array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var added = false;
    for (var j = 0; j < result.length; j++) {
      if (result[j][key] == array[i][key]) {
        result[j].items.push(array[i]);
        added = true;
        break;
      }
    }
    if (!added) {
      var entry = { items: [] };
      entry[key] = array[i][key];
      entry.items.push(array[i]);
      result.push(entry);
    }
  }
  return result;
}