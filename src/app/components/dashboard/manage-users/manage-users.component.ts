import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
declare var jQuery:any;

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  dtOptions: any = {};

  admins: any;
  supervisers: any;
  managers: any;
  addAdminForm: FormGroup;
  updateAdminForm: FormGroup;
  delId = '';
  checkUpdate = false;
  userType = this.auth.getCurrentUserType();
  department = localStorage.getItem('department');
  director: any;
  userProfile: any;
  deparmentsData = JSON.parse(localStorage.getItem('departments'));
  exampleData = JSON.parse(localStorage.getItem('test_departments'));
  departments = [
    {'name': 'Send To All', value: 'Send To All'},
    {'name': 'HR', value: 'hr'},
    {'name': 'RECREATION', value: 'recreation'},
    {'name': 'FIN & ADMIN', value: 'finance'},
    {'name': 'BUILDING SERVICES', value: 'building'},
    {'name': 'LEASING + MARKETING', value: 'marketing'},
    {'name': 'MAINTENANCE',value: 'maintenance'},
    {'name': 'EXECUTIVE TEAM', value: 'executive'}
  ]
  passId: any;
  options = {
    width: '460',
    multiple: true,
    tags: true
  };
  directersDepartment = [];
  constructor(
    private toast: ToastrService,
    public spinner: NgxSpinnerService,
    public api: ApiService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.dtOptions = {
      order : [0, 'desc'],
    };
    this.getUserProfile();
    this.initialize();
    this.getAdmins();
  }
  initialize() {
    this.addAdminForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      user_type: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      udid: new FormControl(''),
      manage_employee: new FormControl(false),
      track_employee: new FormControl(false),
      manage_managers: new FormControl(false),
      manage_supervisers: new FormControl(false),
      manage_reports: new FormControl(false),
      manage_surveys: new FormControl(false),
      manage_messages: new FormControl(false),
      id: new FormControl(''),
    })
  }
  addnewUserModal() {
    this.addAdminForm.reset();
    jQuery("#addModal").modal("show");
  }
  addNewAdmin() {
    this.spinner.show();
    this.api.post('addNewRoleUser', this.addAdminForm.value).subscribe((data) => {
      this.spinner.hide();
      if(data.error) {
        this.toast.warning(data.msg);
      } else {
      jQuery("#addModal").modal("hide");
      this.addAdminForm.reset();
        this.getAdmins();
        this.toast.success(data.msg);
      }
    })
  }
  getUserProfile() {
    this.auth.profileUser().subscribe(data => {
      this.userProfile = data.user;
      this.directersDepartment = JSON.parse(this.userProfile.department)
    })
  }
  getAdmins() {
    this.supervisers = null;
    this.director = null;
    this.managers = null;
    this.spinner.show();
    this.api.get('getRoleUsers/'+this.userType).subscribe((data) => {
      this.spinner.hide();
      if (data.error) {
        this.toast.error(data.msg);
      } else {
        this.supervisers = data.superviser;
        this.director = data.director;
        this.managers = data.manager;
      }
    })
  }
  deleteModal(id) {
    this.delId = id;
    jQuery("#deleteModal").modal("show");
  }
  deleteUser() {
    this.spinner.show();
    this.api.get('delRoleUser/' + this.delId).subscribe((data) => {
      this.spinner.hide();
      jQuery("#deleteModal").modal("hide");

      if(!data.error) {
        this.toast.success(data.msg);
        this.admins = null;
        this.getAdmins();
      } else {
        this.toast.error(data.msg)
      }
    })
  }
  updateAdmins(index, type) {
    this.initialize();
    if(type=='director') {
      this.addAdminForm.patchValue({
        name: this.director[index].name,
        email: this.director[index].email,
        user_type: this.director[index].user_type,
        id: this.director[index].id,
        udid: this.director[index].udid,
        department: JSON.parse(this.director[index].department)
      });

      if(this.director[index].manage_managers == 'true') {
        this.addAdminForm.patchValue({
          manage_managers: true
        })
      }
      if(this.director[index].manage_supervisors == 'true') {
        this.addAdminForm.patchValue({
          manage_supervisers: true
        })
      }
      if(this.director[index].manage_reports == 'true') {
        this.addAdminForm.patchValue({
          manage_reports: true
        })
      }
      if(this.director[index].manage_surveys == 'true') {
        this.addAdminForm.patchValue({
          manage_surveys: true
        })
      }
      if(this.director[index].manage_messages == 'true') {
        this.addAdminForm.patchValue({
          manage_messages: true
        })
      }
        if(this.director[index].manage_employees == 'true') {
          this.addAdminForm.patchValue({
            manage_employee: true
          })
        }
        if(this.director[index].track_employees == 'true') {
  
          this.addAdminForm.patchValue({
            track_employee: true
          })
        }
    }else if(type=='manager') {
      this.department = this.managers[index].department;
      this.addAdminForm.patchValue({
        name: this.managers[index].name,
        email: this.managers[index].email,
        user_type: this.managers[index].user_type,
        id: this.managers[index].id,
        department: this.managers[index].department
      });
      if(this.managers[index].manage_supervisors == 'true') {
        this.addAdminForm.patchValue({
          manage_supervisers: true
        })
      }
      if(this.managers[index].manage_reports == 'true') {
        this.addAdminForm.patchValue({
          manage_reports: true
        })
      }
      if(this.managers[index].manage_surveys == 'true') {
        this.addAdminForm.patchValue({
          manage_surveys: true
        })
      }
      if(this.managers[index].manage_messages == 'true') {
        this.addAdminForm.patchValue({
          manage_messages: true
        })
      }
        if(this.managers[index].manage_employees == 'true') {
          this.addAdminForm.patchValue({
            manage_employee: true
          })
        }
        if(this.managers[index].track_employees == 'true') {
  
          this.addAdminForm.patchValue({
            track_employee: true
          })
        }
    } else {
      this.department = this.supervisers[index].department;
      this.addAdminForm.patchValue({
        name: this.supervisers[index].name,
        email: this.supervisers[index].email,
        user_type: this.supervisers[index].user_type,
        id: this.supervisers[index].id,
        department: this.supervisers[index].department
      });
      if(this.supervisers[index].manage_reports == 'true') {
        this.addAdminForm.patchValue({
          manage_reports: true
        })
      }
      if(this.supervisers[index].manage_surveys == 'true') {
        this.addAdminForm.patchValue({
          manage_surveys: true
        })
      }
      if(this.supervisers[index].manage_messages == 'true') {
        this.addAdminForm.patchValue({
          manage_messages: true
        })
      }
        if(this.supervisers[index].manage_employees == 'true') {
          this.addAdminForm.patchValue({
            manage_employee: true
          })
        }
        if(this.supervisers[index].track_employees == 'true') {
  
          this.addAdminForm.patchValue({
            track_employee: true
          })
        }
    }
    this.checkUpdate = true;
    jQuery("#editModal").modal("show");
    
  }
  onUpdateAdmin() {
    this.spinner.show();
    this.api.post('updateRoleUsers', this.addAdminForm.value).subscribe((data) => {
      this.spinner.hide();
      if(data.error) {
        this.toast.warning(data.msg);
      } else {
        jQuery("#editModal").modal("hide");
        this.addAdminForm.reset();
        this.admins = null;
        this.getAdmins();
        this.checkUpdate = false;
        this.toast.success(data.msg);
      }
    })
  }
  managerFormValue(ev) {
    this.addAdminForm.patchValue({
      manage_managers: ev
    })
  }
  supervisorFormValue(ev) {
    this.addAdminForm.patchValue({
      manage_supervisers: ev
    })
  }
  employeeFormValue(ev) {
    this.addAdminForm.patchValue({
      manage_employee: ev
    })
  }
  trackFormValue(ev) {
    this.addAdminForm.patchValue({
      track_employee: ev
    })
  }
  surveyFormValue(ev) {
    this.addAdminForm.patchValue({
      manage_surveys: ev
    })
  }
  messageFormValue(ev) {
    this.addAdminForm.patchValue({
      manage_messages: ev
    })
  }
  reportFormValue(ev) {
    this.addAdminForm.patchValue({
      manage_reports: ev
    })
  }
  updatePasswordModal(id) {
    this.passId = id;
    jQuery("#passwordModals").modal("show");
  }
  updatePassord() {
    this.spinner.show();
    this.api.get('updateEmployeePassword/' + this.passId).subscribe((data) => {
      this.spinner.hide();
      jQuery("#passwordModals").modal("hide");
      if(!data.error) {
        this.toast.success(data.msg);
      } else {
        this.toast.error(data.msg)
      }
    })
  }
}
