import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imagePath = '/assets/static/logo.png';
  notifications = [];
  user = this.auth.getCurrentUserName();
  userProfile: any;
  isUser: string;
  formData: any = new FormData;

  constructor(
    private auth: AuthService,
    private router: Router,
    public api: ApiService,
    public spinner: NgxSpinnerService
  ) {
    this.isUser = this.auth.getCurrentUserType();
   }

  ngOnInit() {
  }
  logout() {
    this.api.post('logout', {}).subscribe((data) => {
    this.auth.logout()

      window.location.reload();

    })
  }
  uploadEmployees(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      console.log(event.target.files);
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.formData.append('employees', event.target.files[0]);
          this.uploadfile();
      };
    }
  }
  uploadfile() {
    this.spinner.show();
    this.api.post('addBulkEmployees',this.formData).subscribe((res) => {
      this.spinner.hide();
    },(error)=> {
      this.spinner.hide();
    })
  }

}
