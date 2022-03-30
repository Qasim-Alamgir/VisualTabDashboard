import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-track-users',
  templateUrl: './track-users.component.html',
  styleUrls: ['./track-users.component.css']
})
export class TrackUsersComponent implements OnInit {
  ngDepartment = '';
  ngRole= '';
  ngEmployee= '';
  onsiteUser: any = null;
  
  PolygonsArray: any = [];
  dtOptions: any = {};
  userType = this.authService.getCurrentUserType();
  department = localStorage.getItem('department');
  customers: any;

  waypoints = [];
  ngDate: any = new Date();
  employeess: any;
  exampleData = [];
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
  url: "./assets/circle.png",
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
  departmentsData: any = JSON.parse(localStorage.getItem('departments'));
  constructor(
    private toast: ToastrService,
    public spinner: NgxSpinnerService,
    public api: ApiService,
    private authService: AuthService,
    public active: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.PolygonsArray = JSON.parse(localStorage.getItem('PolygonsArray'));
    if(this.userType == 'director') {
      this.departmentsData = JSON.parse(this.department);
    } 
    if(this.userType == 'manager' || this.userType == 'superviser') {
      this.ngDepartment = this.department;
    }
  }
  changeDepartment(ev) {
    if(this.ngRole != '' && this.ngDepartment != '') {
      this.ngEmployee = '';
      this.exampleData = [];
      this.employeess = [];
      this.spinner.show();
      const params = {
        department: this.ngDepartment,
        role: this.ngRole,
        type: 'departments'
      }
      this.api.post('filterReportData', params).subscribe((res) => {
        this.spinner.hide()
        for (let index = 0; index < res.data.length; index++) {
          this.employeess[index] = {
            id: res.data[index].id,
            text: res.data[index].name
          }
        }
        this.exampleData = this.employeess;
      })
    }
  }
  userTrackPoints(): void {    
    this.spinner.show();
    const params = {
      id: this.ngEmployee,
      date: this.ngDate,
      starttime: null,
      endtime: null,
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
}
