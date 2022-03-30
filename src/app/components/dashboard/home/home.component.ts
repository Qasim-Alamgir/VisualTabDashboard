import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { PusherService } from 'src/app/services/pusher.service';
import { MapsAPILoader, AgmMap } from '@agm/core';

// import {} from 'googlemaps';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dashboard: any = null;
  offsite: any = 0;
  onsite: any = 0;
  userType = this.auth.getCurrentUserType();
  onsiteUser: any = null;
  reports: any = 0;
  // Map
  lat = 45.349492204568115;
  lng = -75.8056184300331;
  mapType: "satelite";
  zoom = 15;
  onSiteIcon = {
  url: "./assets/admin/onsite.svg",
  scaledSize: {
      width: 40,
      height: 60
    }
  }
  offSiteIcon =  {
    url: "./assets/admin/offsite.svg",
    scaledSize: {
        width: 40,
        height: 60
    }
  }
  origin: any;
  destination: any;
  PolygonsArray: any = [];
  onSiteData: any=[
    {lat: 45.34804004750554, lng: -75.81154968619614, name: 'Ryan Tracey'},
    {lat: 45.348619858201836, lng: -75.80901355353296, name: 'Chris Davies'},
    {lat: 45.346773033092596, lng: -75.81011356288084, name: 'Developer Bbits	'},
    {lat: 45.34907081797059, lng: -75.81524693983765, name: 'Noah Reid'},
    {lat: 45.351046408894625, lng: -75.81023578614173, name: 'Laurie Giroux'}
  ]
  offSiteData: any=[
    {lat: 45.35189894003973, lng:-75.7988226978643, name: 'Abdirahman Nur'},
    {lat: 45.34845021873271, lng: -75.81934067163795, name: 'Jacob Murray'}
  ]
  constructor(
    private api: ApiService,
    public toast: ToastrService,
    private spinner: NgxSpinnerService,
    private  auth: AuthService,
    private  pusherService: PusherService
  )
  {
  }
  ngOnInit() {
    setTimeout(() => {
      if(localStorage.getItem('UserId')) {
        this.pusherService.channel.bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', data => {
          console.log(data);
          // this.onsiteUser = data.employees;
          // this.offsite = data.offsite	
          // this.onsite = data.onsite
        });
      }
    }, 2000);
    this.getradius();
    if(this.dashboard == null) {
      this.getDashboard();
    }
    
  }
  getradius() {
    this.api.get('radius').subscribe((data) => {
      if(data.radius) {
        for (let index = 0; index < data.radius.length; index++) {
          this.PolygonsArray.push({
            id: data.radius[index].id,
            pointList: JSON.parse(data.radius[index].points),
            selectedArea: Number(data.radius[index].selectedArea),
            lat: Number(data.radius[index].lat),
            lng: Number(data.radius[index].lng)
          })
          localStorage.setItem('PolygonsArray',JSON.stringify(this.PolygonsArray));
        }
      }
    })
  }
  getDashboard() {
    this.spinner.show()
    this.api.get('dashboard/'+this.userType).subscribe(data => {
      this.spinner.hide();
      if(data.error) {
        this.toast.warning(data.msg);
      } else {
        localStorage.removeItem('OnSiteUsers')
        localStorage.removeItem('OffSiteUsers')
        localStorage.removeItem('departments')
        this.dashboard = data.data;

        let arr = [];
        this.dashboard.department.forEach(element => {
          arr.push({
            id: element.value,
            text: element.department,
          })
        });
        // this.offsite = data.data.offsite;
        // this.onsite = data.data.onsite;
        setTimeout(() => {
          localStorage.setItem('test_departments', JSON.stringify(arr));
        }, 200);
        localStorage.setItem('departments', JSON.stringify(this.dashboard.department));

        this.onsiteUser = data.data.employees;
        let localOnsite = []
        let localOffsite = []
        this.onsiteUser.forEach(key => {
          if(key.reports_count_count) {
            this.reports = this.reports + Number(key.reports_count_count);
          }
          if(key.check_site != null) {
            if(key.check_site.onsite == 'true') {
              localOnsite.push(key);
              this.onsite++;
              localStorage.setItem('OnSiteUsers', JSON.stringify(localOnsite));
            } else {
              localOffsite.push(key);
              this.offsite++;
              localStorage.setItem('OffSiteUsers', JSON.stringify(localOffsite));
            }
          }
          
        });
      }
    }, error => {
      this.spinner.hide();
      this.toast.warning(error.error.message);
      this.auth.logout();
      window.location.reload();
    })
  }
}
