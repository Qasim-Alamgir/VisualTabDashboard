import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AuthService } from 'src/app/shared/auth.service';

declare const google: any;
declare var jQuery:any;

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
  content?:string;
  isShown:boolean;
  icon:string;
  mapType: string;
}
@Component({
  selector: 'app-add-radius',
  templateUrl: './add-radius.component.html',
  styleUrls: ['./add-radius.component.css']
})
export class AddRadiusComponent implements OnInit {
  public map: any = { lat: 51.678418, lng: 7.809007 };

  @ViewChild("placesRef",{static:true}) placesRef : GooglePlaceDirective;
  options = {
    types: [],
    componentRestrictions: { country: ['USA', 'CA'] }
  };
  radiusData: any;
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom = 12;
  address: string;

  // Radius
  radius = 50000;
  radiusLat = 0;
  radiusLong = 0;

  markers: marker[] = []
  PolygonsArray = []
  @ViewChild('search',{static:true})
  public searchElementRef: ElementRef;
  private geoCoder;
  lat = 20.5937;
  lng = 78.9629;
  pointList: { lat: number; lng: number }[] = [];
  drawingManager: any;
  selectedShape: any;
  selectedArea = 0;
  show = true;
  mapType: "satelite";
  delId: any;
  isUser: string;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    public api: ApiService,
    public toast: ToastrService,
    public spinner: NgxSpinnerService,
    private ngZone: NgZone,
    private authService: AuthService,

  ) {
  }


  ngOnInit() {
    this.isUser = this.authService.getCurrentUserType();

    //load Map
    this.mapsAPILoader.load().then(() => {
      this.setCurrentPosition();
      this.getradius();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat= place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 24;
        });
      });
    });
  }
  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager = (map: any) => {
    const self = this;
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon'],
      },
      polygonOptions: {
        draggable: true,
        editable: true,
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(map);
    google.maps.event.addListener(
      this.drawingManager,
      'overlaycomplete',
      (event) => {

        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          const paths = event.overlay.getPaths();
          for (let p = 0; p < paths.getLength(); p++) {
            google.maps.event.addListener(
              paths.getAt(p),
              'set_at',
              () => {
                if (!event.overlay.drag) {
                  self.updatePointList(event.overlay.getPath());
                }
              }
            );
            google.maps.event.addListener(
              paths.getAt(p),
              'insert_at',
              () => {
                self.updatePointList(event.overlay.getPath());
              }
            );
            google.maps.event.addListener(
              paths.getAt(p),
              'remove_at',
              () => {
                self.updatePointList(event.overlay.getPath());
              }
            );
          }
          self.updatePointList(event.overlay.getPath());
          this.selectedShape = event.overlay;
          this.selectedShape.type = event.type;
        }
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          self.drawingManager.setDrawingMode(null);
          // To hide:
          self.drawingManager.setOptions({
            drawingControl: false,
          });
        }
      }
    );
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.zoom = 24;
          });
        }
  }

  deleteSelectedShape() {
    this.show = false;
    if (this.selectedShape) {
      this.selectedShape.setMap(null);
      this.selectedArea = 0;
      this.pointList = [];
      // To show:
      this.drawingManager.setOptions({
        drawingControl: true,
      });
    }
  }

  updatePointList(path) {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(
        path.getAt(i).toJSON()
      );
    }
    this.selectedArea = google.maps.geometry.spherical.computeArea(
      path
    );
    console.log(this.pointList)
    console.log(JSON.stringify(this.pointList))
    console.log(this.selectedArea)
  }
  saveSelectedShape() {
    this.spinner.show();
    const params = {
      points: JSON.stringify(this.pointList),
      selectedArea: this.selectedArea,
      lat: this.lat,
      lng: this.lng,
    }
    this.api.post('addRadius', params).subscribe((data) => {
      this.spinner.hide();
      if(!data.error) {
        this.drawingManager.setOptions({
          drawingControl: true,
        });
        this.toast.success(data.msg)
        this.PolygonsArray = []
        this.getradius()
      } else {
        this.toast.warning(data.msg);
      }
    })
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
          console.log(this.PolygonsArray);
          // this.pointList = JSON.parse(data.radius[index].points);
          // this.selectedArea = Number(data.radius[index].selectedArea)
          // this.lat = Number(data.radius[index].lat)
          // this.lng = Number(data.radius[index].lng)
        }
        this.zoom = 24;
      }

    })
  }
  deletePolygonModal(id) {
    this.delId = id;
    jQuery("#deleteModal").modal("show");
  }
  deletePolygon() {
    this.spinner.show();
    this.api.get('deleteRadius/' + this.delId).subscribe((data) => {
      this.spinner.hide();
      jQuery("#deleteModal").modal("hide");

      if(!data.error) {
        this.toast.success(data.msg);
        this.PolygonsArray = [];
        this.getradius();
      } else {
        this.toast.error(data.msg)
      }
    })
  }
  // addRadius() {
  //   this.spinner.show();
  //   const params = {
  //     lat: this.latitude,
  //     lng: this.longitude,
  //     rad: this.radius,
  //     add: this.address
  //   }
  //   this.api.post('addRadius', params).subscribe((data) => {
  //     this.spinner.hide();
  //     if(!data.error) {
  //       this.toast.success(data.msg)
  //     } else {
  //       this.toast.warning(data.msg);
  //     }
  //   })
  // }
  // public handleAddressChange(address: Address) {
  //   this.address = address.formatted_address;
  //   this.latitude = address.geometry.location.lat();
  //   this.longitude = address.geometry.location.lng();
  //   console.log(address)
  // }
  // // Get Current Location Coordinates
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.radiusLat = this.latitude;
  //       this.radiusLong = this.longitude;
  //       this.zoom = 6;

  //       for(let i=1;i<50;i++){
  //         this.markers.push(
  //           {
  //             lat: this.latitude+Math.random(),
  //             lng: this.longitude+Math.random(),
  //             label: `${i}`,
  //             draggable: false,
  //             content: `Content no ${i}`,
  //             isShown:false,
  //             icon:'./assets/marker-red.png'
  //           }
  //         );
  //       }

  //     });
  //   }
  // }

  // clickedMarker(label: string, index: number) {
  //   console.log(`clicked the marker: ${label || index}`)
  // }

  // radiusDragEnd($event: any) {
  //   console.log($event);
  //   this.radiusLat = $event.coords.lat;
  //   this.radiusLong = $event.coords.lng;
  //   this.showHideMarkers();
  // }

  // event(type,$event) {
  //   console.log(type,$event);
  //   this.radius = $event;
  //   this.showHideMarkers();
  // }

  // showHideMarkers(){
  //   Object.values(this.markers).forEach(value => {
  //     value.isShown = this.getDistanceBetween(value.lat,value.lng,this.radiusLat,this.radiusLong);
  //   });
  // }

  // getDistanceBetween(lat1,long1,lat2,long2){
  //   var from = new google.maps.LatLng(lat1,long1);
  //   var to = new google.maps.LatLng(lat2,long2);

  //   if(google.maps.geometry.spherical.computeDistanceBetween(from,to) <= this.radius){
  //     console.log('Radius',this.radius);
  //     console.log('Distance Between',google.maps.geometry.spherical.computeDistanceBetween(
  //       from,to
  //     ));
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

}
