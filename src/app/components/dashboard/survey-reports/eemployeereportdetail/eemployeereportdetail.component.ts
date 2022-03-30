import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-eemployeereportdetail',
  templateUrl: './eemployeereportdetail.component.html',
  styleUrls: ['./eemployeereportdetail.component.css']
})
export class EemployeereportdetailComponent implements OnInit {
  userType = null;
  userName: any;
  tableTitle = null;
  tableRecords: any = [];
  emergency =  [];
  survey = [];
  submitLogin = [];
  submitOther = [];
  constructor(
    private toast: ToastrService,
    public spinner: NgxSpinnerService,
    public api: ApiService,
    private auth: AuthService,
    public active: ActivatedRoute
  ) {
    this.active.params.subscribe((data: any) => {
      this.getDetailById(data.id);
    })
   }

  ngOnInit() {
  }
  getDetailById(id) {
    this.spinner.show();
    this.api.get('getUserDetailById/'+id).subscribe((data) => {
      this.spinner.hide();
      this.userType = data.data.user_type;
      this.userName = data.data.name;
      this.submitLogin = data.data.survey_submitted;
      this.submitOther = data.data.other_survey_submitted;
      this.emergency = data.data.emergency_msg_employee;
      this.survey = data.data.survey_msg_employee;
    })
  }
  showTableContent(type) {
    this.tableRecords = null;
    this.tableTitle = type;
    if(type == 'Emergency Messages') {
      this.tableRecords = this.emergency;
    } else if(type == 'Survey Messages') {
      this.tableRecords = this.survey;
    } else if(type == 'Login Surveys') {
      this.tableRecords = this.submitLogin;
    } else if(type == 'Other Surveys') {
      this.tableRecords = this.submitOther;
    }
  }

}
