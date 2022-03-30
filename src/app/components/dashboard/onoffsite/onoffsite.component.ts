import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/shared/auth.service';
declare var $:any;

@Component({
  selector: 'app-onoffsite',
  templateUrl: './onoffsite.component.html',
  styleUrls: ['./onoffsite.component.css']
})
export class OnoffsiteComponent implements OnInit {
  mytime: Date = new Date();
  @ViewChild('topScrollAnchor', {static: false}) topScroll: ElementRef;
  userType = this.authService.getCurrentUserType();
  type = ''
  customers: any;
  PolygonsArray: any = [];
  offSite: any;
  onSite: any;
  ngID: any;
  ngDate: any = new Date().toLocaleString('en-US', { timeZone: 'Canada/Eastern' });
  ngTime: any;
  ngStartTime;
  ngEndTime;
  waypoints: any = [];
  origin: any;
  destination: any;
  lat = 45.349492204568115;
  lng = -75.8056184300331;
  mapType: "satelite";
  zoom = 15;
  originIcon = {
    url: "./assets/admin/onsite.svg",
    scaledSize: {
        width: 40,
        height: 60
      }
    }
  circle = {
  url: "./assets/admin/onsite.svg",
  scaledSize: {
      width: 20,
      height: 20
    }
  }
  destinationIcon =  {
    url: "./assets/admin/offsite.svg",
    scaledSize: {
        width: 40,
        height: 60
    }
  }
  name: any;
  constructor(
    private authService: AuthService,
    public active: ActivatedRoute,
    public api: ApiService,
    private toast: ToastrService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.active.params.subscribe((data: any) => {
      this.type = data.type;
      console.log(this.type)
      if(this.type == 'onSite') {
        this.onSite = JSON.parse(localStorage.getItem('OnSiteUsers'));
      } else {
        this.offSite = JSON.parse(localStorage.getItem('OffSiteUsers'));
      }
    })
    this.PolygonsArray = JSON.parse(localStorage.getItem('PolygonsArray'));
  }
  setID(id, name) {
    this.name = name;
    this.ngID = id;
    console.log(this.ngID)
    this.scrollToElement();
  }
  scrollToElement(): void {
    this.ngStartTime = null;
    this.ngEndTime = null;
    
    this.spinner.show();
    const params = {
      id: this.ngID,
      date: this.ngDate,
      starttime: null,
      endtime: null,
    }
    this.api.post('userTrackPoints',params).subscribe((res) => {
      $('#mapModal').modal('show');
      this.waypoints = [];
      res.waypoints.forEach(element => {
          this.waypoints.push({
            created_at: element.created_at,
            lat: parseFloat(element.lat),
            lng: parseFloat(element.lng)
          })
      });
      // this.waypoints = res.waypoints
      this.spinner.hide()
      if(this.waypoints.length > 0) {
        this.origin = {
          lat: Number(this.waypoints[0].lat),
          lng: Number(this.waypoints[0].lng),
          created_at: this.waypoints[0].created_at
        }
        this.destination = {
          lat: Number(this.waypoints[this.waypoints.length-1].lat),
          lng: Number(this.waypoints[this.waypoints.length-1].lng),
          created_at: this.waypoints[this.waypoints.length-1].created_at
        }
      } else {
        this.toast.warning('No Record Found')
      }
    })
  }
  filterPoints() {
    let start = null;
    let end = null;
    if(this.ngStartTime) {
      start = new Date(this.ngStartTime).toLocaleString();
    } 
    if(this.ngEndTime) {
      end = new Date(this.ngEndTime).toLocaleString();
    }
    this.waypoints = [];
    this.spinner.show();
    const params = {
      id: this.ngID,
      date: this.ngDate,
      starttime: start,
      endtime: end,
    }
    this.api.post('userTrackPoints',params).subscribe((res) => {
      this.waypoints = [];
      res.waypoints.forEach(element => {
          this.waypoints.push({
            created_at: element.created_at,
            lat: parseFloat(element.lat),
            lng: parseFloat(element.lng)
          })
      });
      // this.waypoints = res.waypoints
      this.spinner.hide()
      if(this.waypoints.length > 0) {
        this.origin = {
          lat: Number(this.waypoints[0].lat),
          lng: Number(this.waypoints[0].lng),
          created_at: this.waypoints[0].created_at
        }
        this.destination = {
          lat: Number(this.waypoints[this.waypoints.length-1].lat),
          lng: Number(this.waypoints[this.waypoints.length-1].lng),
          created_at: this.waypoints[this.waypoints.length-1].created_at
        }
      } else {
        this.toast.warning('No Record Found')
      }
    })
  }
  closeModal() {
    $('#mapModal').modal('hide');

  }
}
