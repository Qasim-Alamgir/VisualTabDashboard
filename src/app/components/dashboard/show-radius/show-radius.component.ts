import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { Component, OnInit } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-show-radius',
  templateUrl: './show-radius.component.html',
  styleUrls: ['./show-radius.component.css']
})
export class ShowRadiusComponent implements OnInit {
  zoom = 15;

  PolygonsArray = []
  lat = 20.5937;
  lng = 78.9629;
  mapType: "satelite";
  constructor(
    private mapsAPILoader: MapsAPILoader,
    public api: ApiService,
    public toast: ToastrService,
    public spinner: NgxSpinnerService

  ) {
  }


  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentPosition();
      this.getradius();
    });
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.zoom = 15;
          });
        }
  }


  getradius() {
    this.spinner.show();
    this.api.get('radius').subscribe((data) => {
      this.spinner.hide();

      if(data.radius) {

        for (let index = 0; index < data.radius.length; index++) {
          this.PolygonsArray.push({
            id: data.radius[index].id,
            pointList: JSON.parse(data.radius[index].points),
            selectedArea: Number(data.radius[index].selectedArea),
            lat: Number(data.radius[index].lat),
            lng: Number(data.radius[index].lng)
          })
        }
        this.zoom = 15;
      }

    })
  }
}
