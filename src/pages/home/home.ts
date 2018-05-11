import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import leaflet from 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => { 
        var popup = leaflet.popup()
              .setLatLng([e.latitude, e.longitude])
              .setContent("<p>Your position is: [" + e.latitude + "," + e.longitude + "]</p>")
              .openOn(this.map);
        popup.openPopup();
      });
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      var circle = leaflet.circle([e.latitude, e.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 2500
      }).on('click',() => {
        var popupCircle = leaflet.popup()
              .setLatLng([e.latitude, e.longitude])
              .setContent('<p>Hello world!<br/>This is a restricted area.</p>')
              .openOn(this.map);
        popupCircle.openPopup();
      }).addTo(this.map);
      }).on('locationerror', (err) => {
        alert(err.message);
    });
  }
}
