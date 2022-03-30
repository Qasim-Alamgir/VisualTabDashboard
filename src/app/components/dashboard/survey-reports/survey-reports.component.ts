import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as ExcelJS  from 'exceljs';
import {saveAs} from "file-saver";
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { exit } from 'process';
@Component({
  selector: 'app-survey-reports',
  templateUrl: './survey-reports.component.html',
  styleUrls: ['./survey-reports.component.css']
})
export class SurveyReportsComponent implements OnInit {
  surveys: any;
  dtOptions = {};
  surveysOther: any;
  userType = this.auth.getCurrentUserType();
  department = localStorage.getItem('department');
  supervisors: any;
  managers: any;
  employees: any;
  userProfile: any;
  directors: any;
  tempsupervisors: any;
  tempmanagers: any;
  tempemployees: any;
  tempdirectors: any;
  filterDate = null;
  // Tab5 Filter
  Roles = []
  departments = [
    {'value': 'All Departments', department: 'All Departments'}
  ]
  employeess = ['All Employees'];
  departmentControl = new FormControl('');
  dateControl = new FormControl('');
  enddateControl = new FormControl('');
  employeeControl = new FormControl('');
  RoleControl = new FormControl('', Validators.required);
  departmentfilteredOptions: Observable<string[]>;
  employeefilteredOptions: Observable<string[]>;
  selectedDepartment: any;

  departmentsData: any = JSON.parse(localStorage.getItem('departments'));

  constructor(
    private toast: ToastrService,
    public spinner: NgxSpinnerService,
    public api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    if(this.userType == 'dev' || this.userType == 'admin') {
      this.departmentsData.forEach(element => {
        this.departments.push(element);
      });
      this.Roles.push(
        {name: 'Directors', value: 'director'},
        {name: 'Managers', value: 'manager'},
        {name: 'Supervisors', value: 'superviser'},
        {name: 'Employees', value: 'employee'}
      )
    } else if(this.userType == 'director') {
      let data = JSON.parse(this.department);
      data.forEach(element => {
        this.departments.push({value: element, department: element});
      });
      this.Roles.push(
        {name: 'Managers', value: 'manager'},
        {name: 'Supervisors', value: 'superviser'},
        {name: 'Employees', value: 'employee'}
      )
    } else {
      this.selectedDepartment = this.department;
      if(this.userType == 'manager') {
        this.Roles.push(
          {name: 'Supervisors', value: 'superviser'},
          {name: 'Employees', value: 'employee'}
        )
      } else {
        this.Roles.push(
          {name: 'Employees', value: 'employee'}
        )
      }
    }
    this.dtOptions = {
      order: [0, 'desc'],
      processing: true,
      paging: true,
      dom: 'lBfrtip',
      // dom: 'Bfrtip',
      language: {
        "lengthMenu": "_MENU_"
      },
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ],
        select: true
    };
    // this.getSurveys('all');
    // this.getOtherSurveys('all');
    this.getUserProfile()
    this.getReportsUsers();
  }
  getUserProfile() {
    this.auth.profileUser().subscribe(data => {
      this.userProfile = data.user;
    })
  }
  getReportsUsers() {
    this.supervisors = null;
    this.managers = null;
    this.employees = null;
    this.spinner.show();
    this.api.get('getReportsUsers').subscribe((data) => {
      this.spinner.hide();
      if (!data.error) {
        this.supervisors = data.data.supervisors;
        this.directors = data.data.directors;
        this.managers = data.data.managers;
        this.employees = data.data.employees;
        this.tempsupervisors = data.data.supervisors;
        this.tempdirectors = data.data.directors;
        this.tempmanagers = data.data.managers;
        this.tempemployees = data.data.employees;
      }
    })
  }
  getSurveys(type) {
    this.surveys = null;
    this.spinner.show();
    this.api.get('submittedLoginSurveys/'+type).subscribe((data) => {
      this.spinner.hide();
      if (!data.error) {
        this.surveys = data.surveys;
      }
    })
  }
  getOtherSurveys(type) {
    this.surveysOther = null;
    this.spinner.show();
    this.api.get('submittedOtherSurveys/'+type).subscribe((data) => {
      this.spinner.hide();
      if (!data.error) {
        this.surveysOther = data.surveys;
      }
    })
  }
  changeValue(ev) {
    this.getSurveys(ev);
  }
  dateChange(ev) {
    this.getSurveys(ev)
  }
  changeValue1(ev) {
    console.log(ev)
    this.getOtherSurveys(ev);
  }
  dateChange1(ev) {
    console.log(ev)
    this.getOtherSurveys(ev)
  }
  changeValues(ev, type) {
    this.directors = [];

    $('#myTable').DataTable();

    let tempArr = [];
    if(type == 'director') {
      this.directors = [];
      console.log(this.directors);
      // this.tempdirectors.filter((item) => {
      //   if(item.created_at.substr(0,10) == ev.target.value) {
      //     tempArr.push(item);
      //   }
      // })
      // this.directors = tempArr;
    } else if(type == 'manager') {
      this.managers.filter((item) => {
        if(item.created_at.substr(0,10) == ev.target.value) {
          tempArr.push(item);
        }
      })
      this.managers = null;
      this.managers = tempArr;
    } else if(type == 'superviser') {
      this.supervisors.filter((item) => {
        if(item.created_at.substr(0,10) == ev.target.value) {
          tempArr.push(item);
        }
      })
      this.supervisors = null;
      this.supervisors = tempArr;
    } else {
      this.employees.filter((item) => {
        if(item.created_at.substr(0,10) == ev.target.value) {
          tempArr.push(item);
        }
      })
      this.employees = null;
      this.employees = tempArr;
    }
    
  }
  onRefresh(type) {
    var table = $('#myTable').DataTable();
    table.clear();
    this.directors = this.tempdirectors

    this.directors.forEach(element => {
    table.row.add([element.created_at,element.name,element.email,1,1]);

    });
    table.draw();


    console.log(this.tempdirectors);
    this.filterDate = null;
    if(type == 'director') {
      this.directors = this.tempdirectors;
    } else if(type == 'manager') {
      this.managers = this.tempmanagers
    } else if(type == 'superviser') {
      this.supervisors = this.tempsupervisors
    } else {
      this.employees = this.tempemployees
    }
  }
// Filters
async exportJsonToExcel(jsonData, check): Promise<void> {
  // jsonData.data.forEach((element,index) => {

  // });
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Developer';
  workbook.lastPrinted = new Date();
  workbook.views = 
  [
    {
      x: 0, y: 0, width: 10000, height: 20000,
      firstSheet: 0, activeTab: 0, visibility: 'visible'
    }
  ]
  // new
  // let sheet = workbook.addWorksheet('Reports', {
  //   properties: {tabColor:{argb:'FFC0000'}},
  //   pageSetup:{fitToPage: true, fitToHeight: 5, fitToWidth: 7},
  // });
  // let header_rows = ['Employee Name','Survey Name','Submitted at'];
  // await jsonData.questions.forEach(element => {
  //   header_rows.push(element.question)
  // });
  // let header = sheet.addRow(header_rows)
  // header.fill = {
  //   type: "pattern",
  //   pattern: "solid",
  //   fgColor: {argb: "5b9bd5"},
  //   bgColor: {argb: "FF000000"}
  //   };
  //   header.border = {
  //     right: {style:'thin', color: {argb:'000000'}}
  //   };
  // await jsonData.surveys.forEach(survey => {
  //   if(survey.user != null) {
  //     let inner_row = [];
  //     inner_row = [survey.user.name, jsonData.survey.name,survey.updated_at];
  //     jsonData.questions.forEach(element => {
  //       let counter = 0;
  //       let ans = '';
  //       survey.empanswer.forEach(answer => {
  //         if(element.id == answer.question_id) {
  //           counter = 1;
  //           ans = answer.answer
  //         }
  //       });
  //       if(counter == 1) {
  //         inner_row.push(ans)
  //       } else {
  //         inner_row.push(ans)
  //       }
  //     });
  //     let rows = sheet.addRow(inner_row);
  //     rows.fill = {
  //       type: 'pattern',
  //       pattern:'solid',
  //       fgColor:{argb:'deeaf6'},
  //       bgColor: {
  //         argb: "FF000000"
  //       }
  //     };
  //     rows.border = {
  //       top: {style:'thin', color: {argb:'000000'}},
  //       right: {style:'thin', color: {argb:'000000'}}
  //     };
  //   } 
      
  // })
  // old
  await jsonData.data.forEach(async element => {
    const sheet = workbook.addWorksheet(element.date, {
      properties: {tabColor:{argb:'FFC0000'}},
      pageSetup:{fitToPage: true, fitToHeight: 5, fitToWidth: 7},
    });
    let columns_array = [];
    columns_array = [
      'Emplyee Name',
      'Survey Name',
      'Submitted At'
    ]
    await element.questions.forEach(question => {
      columns_array.push(question.question)
    });
    let header = sheet.addRow(columns_array)
    header.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {argb: "5b9bd5"},
      bgColor: {argb: "FF000000"}
      };
      header.border = {
        right: {style:'thin', color: {argb:'000000'}}
      };
      if(element.surveys.length == 0) {
        let inner_row = [];
        inner_row = ['', '','','No Survey Found'];
        sheet.addRow(inner_row);
      } else {
        await element.surveys.forEach(survey => {
            if(survey.user != null) {
              let inner_row = [];
              inner_row = [survey.user.name, jsonData.survey.name,survey.updated_at];
              element.questions.forEach(q => {
                let counter = 0;
                let ans = '';
                survey.empanswer.forEach(answer => {
                  if(q.id == answer.question_id) {
                    counter = 1;
                    ans = answer.answer
                  }
                });
                if(counter == 1) {
                  inner_row.push(ans)
                } else {
                  inner_row.push(ans)
                }
              });
              let rows = sheet.addRow(inner_row);
              rows.fill = {
                type: 'pattern',
                pattern:'solid',
                fgColor:{argb:'deeaf6'},
                bgColor: {
                  argb: "FF000000"
                }
              };
              rows.border = {
                top: {style:'thin', color: {argb:'000000'}},
                right: {style:'thin', color: {argb:'000000'}}
              };
            } 
          });
      }
    // let countRow = 0;
    // let Arraylength = 0;
    //   if(check == 'login') {
    //     Arraylength = employee.report_survey_submitted.length
    //   } else {
    //     Arraylength = employee.report_other_survey_submitted.length
    //   }
    // if(Arraylength == 0) {
    //   sheet.getCell('D1').value = 'No Survey Found'
    //   sheet.getRow(2).values = [];
    // } else {
    //   let employeeArray = [];
    //   if(check == 'login') {
    //     employeeArray = employee.report_survey_submitted;
    //   } else {
    //     employeeArray = employee.report_other_survey_submitted;
    //   }
    //   employeeArray.forEach(survey => {
    //     countRow++;
    //     let row;
    //     row = sheet.getRow(countRow);
    //     row.getCell(3).value = survey.updated_at;
    //     row.getCell(3).fill = {
    //       type: 'gradient',
    //       gradient: 'angle',
    //       degree: 0,
    //       stops: [
    //           {position:0, color:{argb:'35d600a1'}},
    //           {position:0.5, color:{argb:'35d600a1'}},
    //           {position:1, color:{argb:'35d600a1'}}
    //       ]
    //   };       
    //     sheet.getRow(countRow).font = {bold: true};

    //     countRow++;
    //     sheet.addRow(['Question', 'Survey Name', 'Expected Answers', 'Employee Answers', 'Submitted At']);
    //     sheet.getRow(countRow).font = {bold: true};

    //     survey.empanswer.forEach((q, index)=> {
    //       countRow++;
    //       sheet.addRow([q.questions.question, survey.survey.name, q.questions.expected_ans,q.answer, survey.updated_at]);
    //     }); 
    //   });
    // }
  });
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const fileExtension = '.xlsx';
    const blob = new Blob([buffer], {type: fileType});
    saveAs(blob, 'Survey Reports('+ new Date()+')'  + fileExtension);
}



private getEmployees() {
  this.employeefilteredOptions = this.employeeControl.valueChanges
  .pipe(
    startWith(''),
    map(value => this._filterEmployees(value))
  );
}
private _filterEmployees(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.employeess.filter(option => option.toLowerCase().includes(filterValue));
}
changeDepartment(ev) {
  console.log(ev)
  this.employeess = ['All Employees'];

  this.spinner.show();
  const params = {
    department: this.selectedDepartment,
    role: this.RoleControl.value,
    type: 'departments'
  }
  this.api.post('filterReportData', params).subscribe((res) => {
    this.spinner.hide()
    res.data.forEach(element => {
      this.employeess.push(element.name)
    });
    this.getEmployees();
  })
}
getReportsData(Surveytype) {
  if(this.dateControl.value == '') {
    this.toast.warning('Please Select Start Date')
  } else if(this.enddateControl.value == '') {
    this.toast.warning('Please Select end Date')
  } else {
    this.spinner.show();
    const params = {
      department: this.selectedDepartment,
      date: this.dateControl.value,
      enddate: this.enddateControl.value,
      employee: this.employeeControl.value,
      type: 'data',
      role: this.RoleControl.value,
      surveyType: Surveytype
    }
    this.api.post('filterReportData', params).subscribe((res: any) => {
      this.spinner.hide();
      this.exportJsonToExcel(res, Surveytype)
      this.dateControl = new FormControl('');
      this.enddateControl = new FormControl('');
      this.employeeControl = new FormControl('');
    },(error => {
      this.spinner.hide();
    }))
  }
  
}
async exportJsonToExcel1(jsonData, check): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Developer';
  workbook.lastPrinted = new Date();
  workbook.views = 
  [
    {
      x: 0, y: 0, width: 10000, height: 20000,
      firstSheet: 0, activeTab: 0, visibility: 'visible'
    }
  ]
  
  await jsonData.forEach(employee => {
    const sheet = workbook.addWorksheet(employee.name, {
            properties: {tabColor:{argb:'FFC0000'}},
            pageSetup:{fitToPage: true, fitToHeight: 5, fitToWidth: 7},
          });
    sheet.columns = [
      { key: 'Question',width: 30},
      { key: 'Survey Name',width: 30},
      { key: 'Expected Answers',width: 30},
      { key: 'Employee Answers',width: 30},
      { key: 'Submitted At',width: 30}
      ]
    let countRow = 0;
    let Arraylength = 0;
    Arraylength = employee.report_other_survey_submitted.length
    if(Arraylength == 0) {
      sheet.getCell('D1').value = 'No Survey Found'
      sheet.getRow(2).values = [];
    } else {
      let employeeArray = [];
      employeeArray = employee.report_other_survey_submitted;
      employeeArray.forEach(survey => {
        countRow++;
        let row;
        row = sheet.getRow(countRow);
        row.getCell(3).value = survey.updated_at;
        row.getCell(3).fill = {
          type: 'gradient',
          gradient: 'angle',
          degree: 0,
          stops: [
              {position:0, color:{argb:'35d600a1'}},
              {position:0.5, color:{argb:'35d600a1'}},
              {position:1, color:{argb:'35d600a1'}}
          ]
      };       
        sheet.getRow(countRow).font = {bold: true};

        countRow++;
        sheet.addRow(['Question', 'Survey Name', 'Expected Answers', 'Employee Answers', 'Submitted At']);
        sheet.getRow(countRow).font = {bold: true};

        survey.survey.other_questions.forEach((q, index) => {
          countRow++;
          let answer = '';
          answer = survey.empanswer[index].answer;
          sheet.addRow([q.question, survey.survey.name, q.expected_ans,answer, survey.updated_at]);
        }); 
      });
    }
  });
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const fileExtension = '.xlsx';
    const blob = new Blob([buffer], {type: fileType});
    saveAs(blob, 'Survey Reports('+ new Date()+')'  + fileExtension);
}
getReportsData1(Surveytype) {
  if(this.dateControl.value == '' && this.enddateControl.value != '') {
    this.toast.warning('Please Select Start Date')
  } else if(this.dateControl.value != '' && this.enddateControl.value == '') {
    this.toast.warning('Please Select end Date')
  } else {
    this.spinner.show();
    const params = {
      department: this.selectedDepartment,
      date: this.dateControl.value,
      enddate: this.enddateControl.value,
      employee: this.employeeControl.value,
      type: 'data',
      role: this.RoleControl.value,
      surveyType: Surveytype
    }
    this.api.post('filterReportDataOtherSurvey', params).subscribe((res: any) => {
      this.spinner.hide();
      console.log(res);
      this.exportJsonToExcel1(res.data, Surveytype)
      this.dateControl = new FormControl('');
      this.enddateControl = new FormControl('');
      this.employeeControl = new FormControl('');
    })
  }
  
}
}
