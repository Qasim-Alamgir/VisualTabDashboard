import { SurveyReportsModule } from './survey-reports/survey-reports.module';
import { AgmCoreModule } from '@agm/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { SidebarComponent } from 'src/app/common/sidebar/sidebar.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ChartsModule } from 'ng2-charts';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageSurveysComponent } from './manage-surveys/manage-surveys.component';
import { SendMessagesComponent } from './send-messages/send-messages.component';
import { TrackUsersComponent } from './track-users/track-users.component';
import { DistanceCheckerComponent } from './distance-checker/distance-checker.component';
import { SurveyReportsComponent } from './survey-reports/survey-reports.component';
import { ManagementUsersComponent } from './management-users/management-users.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { AddRadiusComponent } from './add-radius/add-radius.component';
import { FooterCopyroghtComponent } from './footer-copyroght/footer-copyroght.component';
import { ShowRadiusComponent } from './show-radius/show-radius.component';
import { ReportfilesComponent } from './reportfiles/reportfiles.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AgmDirectionModule } from 'agm-direction';
import { OnoffsiteComponent } from './onoffsite/onoffsite.component';   // agm-direction
import { TimepickerActions, TimepickerConfig, TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerConfig, BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsDatepickerActions } from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.actions';
import { NgSelect2Module } from 'ng-select2';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';
import { DepartmentsComponent } from './departments/departments.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
      },
      {
        path: 'manage-admins',
        component: ManageAdminsComponent,
      },
      {
        path: 'management-users',
        component: ManagementUsersComponent,
      },
      {
        path: 'manage-surveys',
        component: ManageSurveysComponent,
      },
      {
        path: 'manage-messages',
        component: SendMessagesComponent,
      },
      {
        path: 'track-users/:type',
        component: TrackUsersComponent,
      },
      {
        path: 'meter-checker',
        component: DistanceCheckerComponent,
      },
      {
        path: 'survey-report',
        loadChildren: () => import('./survey-reports/survey-reports.module').then(mod => mod.SurveyReportsModule),

      },
      {
        path: 'update-password',
        component: UpdatePasswordComponent,
      },
      {
        path: 'add-radius',
        component: AddRadiusComponent,
      },
      {
        path: 'show-radius',
        component: ShowRadiusComponent,
      },
      {
        path: 'footer-copyright',
        component: FooterCopyroghtComponent,
      },
      {
        path: 'report-files',
        component: ReportfilesComponent,
      },
      {
        path: 'user-detail/:type',
        component: OnoffsiteComponent,
      },
      {
        path: 'push-notifications',
        component: PushNotificationsComponent,
      },
      {
        path: 'manage-departments',
        component: DepartmentsComponent,
      },
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ManageUsersComponent,
    ManageSurveysComponent,
    SendMessagesComponent,
    TrackUsersComponent,
    DistanceCheckerComponent,
    ManagementUsersComponent,
    UpdatePasswordComponent,
    ManageAdminsComponent,
    AddRadiusComponent,
    FooterCopyroghtComponent,
    ShowRadiusComponent,
    ReportfilesComponent,
    OnoffsiteComponent,
    PushNotificationsComponent,
    DepartmentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    GooglePlaceModule,
    ChartsModule,
    NgxUiLoaderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDK27Cn3NyeNo5_hUm8EjGRuGThrTNrFwY',
      libraries: ['places','drawing', 'geometry']
    }),
    AgmDirectionModule, 
    MatAutocompleteModule,
    TimepickerModule,
    NgSelect2Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ TimepickerConfig,TimepickerActions ]
})
export class DashboardModule { }
