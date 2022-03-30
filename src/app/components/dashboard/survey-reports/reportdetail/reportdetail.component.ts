import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-reportdetail',
  templateUrl: './reportdetail.component.html',
  styleUrls: ['./reportdetail.component.css']
})
export class ReportdetailComponent implements OnInit {

  userType = null;
  userName: any;
  tableTitle = null;
  tableRecords: any = [];
  supervisers = {
    supervisors: [],
    managers: [],
    employees: [],
    emergencyMsg: [],
    surveyMsg: []
  };
  dtOptions: { };
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
    this.dtOptions = {
      order: [0, 'desc'],
      dom: 'Bfrtip',
        buttons: [
          'pageLength','copy', 'csv', 'excel', 'print',
        ],
        select: true
    };
  }
  getDetailById(id) {
    this.spinner.show();
    this.api.get('getUserDetailById/'+id).subscribe((data) => {
      this.spinner.hide();
      this.userType = data.data.user_type;
      this.userName = data.data.name;
      if(this.userType == 'director') {
        this.supervisers.managers = data.data.department_manager;
        this.supervisers.supervisors = data.data.department_superviser;
        this.supervisers.employees = data.data.department_employees;
        this.supervisers.emergencyMsg = data.data.emergency_msg;
        this.supervisers.surveyMsg = data.data.survey_msg;
      } else if(this.userType == 'manager') {
        this.supervisers.employees = data.data.department_employees;
        this.supervisers.supervisors = data.data.department_superviser;
        this.supervisers.emergencyMsg = data.data.emergency_msg;
        this.supervisers.surveyMsg = data.data.survey_msg;
      } else {
        this.supervisers.employees = data.data.manager_employees;
        this.supervisers.emergencyMsg = data.data.emergency_msg;
        this.supervisers.surveyMsg = data.data.survey_msg;
      }
    })
  }
  showTableContent(type) {
    this.tableRecords = null;
    this.tableTitle = type;
    if(type == 'Managers') {
      this.tableRecords = this.supervisers.managers;
    } else if(type == 'Supervisor') {
      this.tableRecords = this.supervisers.supervisors;
    } else if(type == 'Employees') {
      this.tableRecords = this.supervisers.employees;
    } else if(type == 'Emergency Notifications') {
      this.tableRecords = this.supervisers.emergencyMsg;
    } else if(type == 'Survey Messages') {
      this.tableRecords = this.supervisers.surveyMsg;
    }
  }
  switchToManager(id) {
    this.tableRecords = null;
    this.getDetailById(id);
  }
  switchToSuperviser(id) {
    this.tableRecords = null;
    this.getDetailById(id);
  }
}
