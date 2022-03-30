import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/shared/auth.service';
declare var jQuery:any;

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isUser: string;
  userProfile: any;
  constructor(
    private authService: AuthService,
    private api: ApiService
  ) {
      this.isUser = this.authService.getCurrentUserType();
    }

  ngOnInit() {
    this.getUserProfile();
    // Toggle the side navigation
    $('#sidebarToggle, #sidebarToggleTop').on('click', function(e) {
      $('body').toggleClass('sidebar-toggled');
      $('.sidebar').toggleClass('toggled');
      if ($('.sidebar').hasClass('toggled')) {
        $('.sidebar .collapse').collapse('hide');
      }
    });
  }

  closeNav(){
    $('.sidebar').toggleClass('toggled');
  }
  getUserProfile() {
    this.authService.profileUser().subscribe(data => {
      this.userProfile = data.user;
      if (this.userProfile.remember_token != 'update') {
        jQuery("#passwordModal").modal("show");
      }
    })
  }

}
