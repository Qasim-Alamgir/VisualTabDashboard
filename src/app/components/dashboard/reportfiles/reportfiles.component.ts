import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import * as ExcelJS  from 'exceljs';
import {saveAs} from "file-saver";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reportfiles',
  templateUrl: './reportfiles.component.html',
  styleUrls: ['./reportfiles.component.css']
})
export class ReportfilesComponent implements OnInit {
  @ViewChild('userTable', {static: false}) userTable: ElementRef;

  departments = [
    'All Departments',
    'RECREATION',
    'FIN & ADMIN',
    'BUILDING SERVICES',
    'LEASING + MARKETING',
    'MAINTENANCE',
    'EXECUTIVE TEAM'
  ]
  employees = ['All Employees'];
  departmentControl = new FormControl('');
  dateControl = new FormControl('');
  enddateControl = new FormControl('');
  employeeControl = new FormControl('');
  departmentfilteredOptions: Observable<string[]>;
  employeefilteredOptions: Observable<string[]>;

  arr = [
    [{ FirstColumn: "Some data", SecondColumn: "Page 1 with 1 data" }],
    [
      { FirstColumn: "Some data-1", SecondColumn: "Page 2 with 2 data-1" },
      { FirstColumn: "Some data-2", SecondColumn: "Page 2 with 2 data-2" }
    ],
    [
      { FirstColumn: "Some data-1", SecondColumn: "Page 3 with 3 data-1" },
      { FirstColumn: "Some data-2", SecondColumn: "Page 3 with 3 data-2" },
      { FirstColumn: "Some data-3", SecondColumn: "Page 3 with 3 data-3" }
    ],
  ];

  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}
  ngOnInit() {
    this.getDepartments();
  }
  async exportJsonToExcel(jsonData): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Me';
    workbook.lastPrinted = new Date();
    workbook.views = 
    [
      {
        x: 0, y: 0, width: 10000, height: 20000,
        firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
    ]
    let countRow = 0;
    
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
        sheet.getCell('A1').font = {bold: true}
          sheet.getCell('B1').font = {bold: true}
          sheet.getCell('C1').font = {bold: true}
          sheet.getCell('D1').font = {bold: true}
      if(employee.report_survey_submitted.lenght == 0) {
        sheet.getCell('D1').value = 'No Survey Found'
        sheet.getRow(2).values = [];
      } else {
        employee.report_survey_submitted.forEach(survey => {
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

          survey.survey.question.forEach(q => {
            countRow++;
            let answer = '';
            sheet.addRow([q.question, survey.survey.name, q.answer[0].answer,q.emp_answer[0].answer, survey.updated_at]);
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

  private getDepartments() {
    this.departmentfilteredOptions = this.departmentControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.departments.filter(option => option.toLowerCase().includes(filterValue));
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
    return this.employees.filter(option => option.toLowerCase().includes(filterValue));
  }
  changeDepartment(ev) {
    this.employees = ['All Employees'];
  
    this.spinner.show();
    const params = {
      department: this.departmentControl.value,
      type: 'departments'
    }
    this.api.post('filterReportData', params).subscribe((res) => {
      this.spinner.hide()
      res.data.forEach(element => {
        this.employees.push(element.name)
      });
      this.getEmployees();
    })
  }
  getReportsData() {
    if(this.dateControl.value == '' && this.enddateControl.value != '') {
      this.toast.warning('Please Select Start Date')
    } else if(this.dateControl.value != '' && this.enddateControl.value == '') {
      this.toast.warning('Please Select end Date')
    } else {
      this.spinner.show();
      const params = {
        department: this.departmentControl.value,
        date: this.dateControl.value,
        enddate: this.enddateControl.value,
        employee: this.employeeControl.value,
        type: 'data'
      }
      this.api.post('filterReportData', params).subscribe((res: any) => {
        this.spinner.hide();
        this.exportJsonToExcel(res.data)
        this.dateControl = new FormControl('');
        this.enddateControl = new FormControl('');
        this.employeeControl = new FormControl('');
      })
    }
    
  }

}
