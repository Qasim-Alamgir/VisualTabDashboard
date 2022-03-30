import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyReportsComponent } from './survey-reports.component';

import { CommonModule } from '@angular/common';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { ReportdetailComponent } from './reportdetail/reportdetail.component';
import { EemployeereportdetailComponent } from './eemployeereportdetail/eemployeereportdetail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes: Routes = [
  {
    path: '',
    component: SurveyReportsComponent,
  },
  {
    path: 'report-details/:id',
    component: ReportdetailComponent,
  },
  {
    path: 'employee-report-details/:id',
    component: EemployeereportdetailComponent,
  },
  {
    path: 'report/:id/:user/:type',
    component: GenerateReportComponent,
  }
];

@NgModule({
  declarations: [
    SurveyReportsComponent,
  GenerateReportComponent,
  ReportdetailComponent,
  EemployeereportdetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SurveyReportsModule { }
