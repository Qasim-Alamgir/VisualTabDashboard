(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["survey-reports-survey-reports-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/eemployeereportdetail/eemployeereportdetail.component.html":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/eemployeereportdetail/eemployeereportdetail.component.html ***!
  \******************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\" *ngIf=\"userName\">\r\n\r\n    <!-- Page Heading -->\r\n\r\n    <div class=\"d-sm-flex align-items-center justify-content-between mb-4\">\r\n        <h1 class=\"h2 mb-0 text-gray-800 text-uppercase text-dark\">{{userName}}</h1>\r\n        <h1 class=\"h2 mb-0 text-gray-800 text-uppercase text-success\">{{userType}}</h1>\r\n    </div>\r\n    <!-- <h4 style=\"text-transform: capitalize;\">Welcome {{Auth::user()->f_name}} {{Auth::user()->l_name}} ! {{Auth::user()->user_type}}</h4> -->\r\n    <!-- Content Row -->\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-xl-3 col-md-6 mb-4\">\r\n            <div class=\"card border-left-success shadow h-100 py-2\">\r\n                <div class=\"card-body\">\r\n                    <a href=\"javascript:void(0)\" (click)=\"showTableContent('Emergency Messages')\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-l font-weight-bold text-success text-uppercase mb-1\">Emergency Messages</div>\r\n                                <div class=\"h3 mb-0 font-weight-bold text-gray-800\">{{emergency.length}}</div>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Earnings (Monthly) Card Example -->\r\n        <div class=\"col-xl-3 col-md-6 mb-4\">\r\n            <div class=\"card border-left-primary shadow h-100 py-2\">\r\n                <div class=\"card-body\">\r\n                    <a href=\"javascript:void(0)\" (click)=\"showTableContent('Survey Messages')\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-l font-weight-bold text-primary text-uppercase mb-1\">Survey Messages</div>\r\n                                <div class=\"h3 mb-0 font-weight-bold text-gray-800\">{{survey.length}}</div>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <!-- Earnings (Monthly) Card Example -->\r\n        <div class=\"col-xl-3 col-md-6 mb-4\">\r\n            <div class=\"card border-left-danger shadow h-100 py-2\">\r\n                <div class=\"card-body\">\r\n                    <a href=\"javascript:void(0)\" (click)=\"showTableContent('Login Surveys')\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-l font-weight-bold text-danger text-uppercase mb-1\">Submitted Login</div>\r\n                                <div class=\"h3 mb-0 font-weight-bold text-gray-800\">{{submitLogin.length}}</div>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-xl-3 col-md-6 mb-4\">\r\n            <div class=\"card border-left-warning shadow h-100 py-2\">\r\n                <div class=\"card-body\">\r\n                    <a href=\"javascript:void(0)\" (click)=\"showTableContent('Other Surveys')\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-l font-weight-bold text-warning text-uppercase mb-1\">Submitted Other</div>\r\n                                <div class=\"h3 mb-0 font-weight-bold text-gray-800\">{{submitOther.length}}</div>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\" *ngIf=\"tableRecords\">\r\n        <div class=\"col-xl-12 col-md-12 mb-4\">\r\n            <div class=\"card shadow mb-4\">\r\n                <div class=\"card-header  py-3 d-sm-flex align-items-center justify-content-between mb-4\">\r\n                    <h6 class=\"m-0 font-weight-bold text-primary\">{{tableTitle}}</h6>\r\n                </div>\r\n                <div class=\"card-body\" *ngIf=\"tableTitle == 'Login Surveys' || tableTitle == 'Other Surveys'\">\r\n                    <table class=\"table table-bordered text-center\" datatable width=\"100%\" cellspacing=\"0\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>Created At</th>\r\n                                <th>Survey Name</th>\r\n                                <th>Submission Date</th>\r\n                                <th>Status</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let item of tableRecords; let j=index\">\r\n                                <td>{{item.created_at | date: 'MM/dd/yyyy'}}</td>\r\n                                <td>\r\n                                    <a *ngIf=\"item.status == 'completed'\" [routerLink]=\"['/admin/survey-report/report',item.id,item.user_id,tableTitle]\">{{item.survey.name}}</a>\r\n                                    <a *ngIf=\"item.status == 'pending'\">{{item.survey.name}}</a>\r\n                                </td>\r\n                                <td>{{item.updated_at | date: 'MM/dd/yyyy'}}</td>\r\n                                <td *ngIf=\"item.status == 'pending'\"><span class=\"badge badge-danger\">Pending</span></td>\r\n                                <td *ngIf=\"item.status == 'completed'\"><span class=\"badge badge-success\">Completed</span>\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n                <div class=\"card-body\" *ngIf=\"tableTitle == 'Emergency Messages' || tableTitle == 'Survey Messages'\">\r\n                    <table class=\"table table-bordered text-center\" datatable width=\"100%\" cellspacing=\"0\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>Created At</th>\r\n                                <th>Title</th>\r\n                                <th>Message</th>\r\n                                <th>Send By</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let item of tableRecords; let j=index\">\r\n                                <td>{{item.created_at | date: 'MM/dd/yyyy'}}</td>\r\n                                <td>{{item.title}}</td>\r\n                                <td>{{item.message}}</td>\r\n                                <td>{{item.send_by.name}}</td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<ngx-spinner></ngx-spinner>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/generate-report/generate-report.component.html":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/generate-report/generate-report.component.html ***!
  \******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\" *ngIf=\"surveys\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xl-12 col-md-12 mb-4\">\r\n            <div class=\"card shadow mb-4\">\r\n                <div class=\"card-header  py-3 d-sm-flex align-items-center justify-content-between mb-4\">\r\n                    <h6 class=\"m-0 font-weight-bold text-primary\">Survey Report</h6>\r\n                    <button (click)=\"printWindow()\" class=\"d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm\">Print</button>\r\n                </div>\r\n                <div class=\"card-body\" id=\"print-div\" *ngIf=\"surveys\">\r\n                    <h5><strong>Name: </strong> {{submittedSurvey.user.name}}</h5>\r\n                    <!-- <h5 *ngIf=\"result\"><strong>Result: </strong> <span class=\"badge badge-success\">Clear</span></h5>\r\n                    <h5 *ngIf=\"!result\"><strong>Result: </strong> <span class=\"badge badge-danger'\">Not Clear</span></h5> -->\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6 col-sm-6\">\r\n                            <strong>{{submittedSurvey.user.email}}</strong><br>\r\n                        </div>\r\n                        <div class=\"col-md-6 col-sm-6 text-right\">\r\n                            <p class=\"mb-0\"><strong>Survey Name: </strong> {{submittedSurvey.survey.name}}</p>\r\n                            <p class=\"mb-0\" *ngIf=\"submittedSurvey.status == 'completed'\"><strong>Survey Status: </strong> <span class=\"badge badge-success\">{{submittedSurvey.status}}</span></p>\r\n                            <p class=\"mb-0\" *ngIf=\"submittedSurvey.status == 'pending'\"><strong>Survey Status: </strong> <span class=\"badge badge-danger\" *ngIf=\"submittedSurvey.status == 'pending'\">{{submittedSurvey.status}}</span></p>\r\n                            <p class=\"mb-0\"><strong>Submission Date: </strong> {{submittedSurvey.updated_at | date: 'MM/dd/yyyy'}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <table class=\"table table-bordered text-center table-responsive\" width=\"100%\" cellspacing=\"0\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>#</th>\r\n                                <th>Question</th>\r\n                                <th>Employee's Answer</th>\r\n                                <th>Expected Answer</th>\r\n                                <th>Result</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let item of surveys; let j=index\">\r\n                                <td>{{j + 1}}</td>\r\n                                <td>{{item.questions.question}}</td>\r\n                                <td> {{item.answer}}</td>\r\n                                <td>{{item.questions.expected_ans}}\r\n                                </td>\r\n                                <td>\r\n                                    <div *ngIf=\"matchAnswers(j) == false\">\r\n                                        <span class=\"badge badge-danger\">Wrong</span>\r\n                                    </div>\r\n                                    <div *ngIf=\"matchAnswers(j) == true\">\r\n                                        <span class=\"badge badge-success\">Correct</span>\r\n                                    </div>\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<ngx-spinner></ngx-spinner>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/reportdetail/reportdetail.component.html":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/reportdetail/reportdetail.component.html ***!
  \************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid\" *ngIf=\"userName\">\r\n\r\n    <!-- Page Heading -->\r\n\r\n    <div class=\"d-sm-flex align-items-center justify-content-between mb-4\">\r\n        <h1 class=\"h2 mb-0 text-gray-800 text-uppercase text-dark\">{{userName}}</h1>\r\n        <h1 class=\"h2 mb-0 text-gray-800 text-uppercase text-success\">{{userType}}</h1>\r\n    </div>\r\n    <!-- <h4 style=\"text-transform: capitalize;\">Welcome {{Auth::user()->f_name}} {{Auth::user()->l_name}} ! {{Auth::user()->user_type}}</h4> -->\r\n    <!-- Content Row -->\r\n    <div class=\"row\">\r\n        <div class=\"col-xl-3 col-md-6 mb-4\" *ngIf=\"userType=='director'\">\r\n            <div class=\"card border-left-success shadow h-100 py-2\">\r\n                <div class=\"card-body\">\r\n                    <a href=\"javascript:void(0)\" (click)=\"showTableContent('Managers')\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-l font-weight-bold text-success text-uppercase mb-1\">Managers</div>\r\n                                <div class=\"h3 mb-0 font-weight-bold text-gray-800\">{{supervisers.managers.length}}</div>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-xl-3 col-md-6 mb-4\" *ngIf=\"userType=='director' || userType=='manager'\">\r\n            <div class=\"card border-left-success shadow h-100 py-2\">\r\n                <div class=\"card-body\">\r\n                    <a href=\"javascript:void(0)\" (click)=\"showTableContent('Supervisor')\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-l font-weight-bold text-success text-uppercase mb-1\">Supervisors</div>\r\n                                <div class=\"h3 mb-0 font-weight-bold text-gray-800\">{{supervisers.supervisors.length}}</div>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Earnings (Monthly) Card Example -->\r\n        <div class=\"col-xl-3 col-md-6 mb-4\">\r\n            <div class=\"card border-left-primary shadow h-100 py-2\">\r\n                <div class=\"card-body\">\r\n                    <a href=\"javascript:void(0)\" (click)=\"showTableContent('Employees')\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-l font-weight-bold text-primary text-uppercase mb-1\">Employees</div>\r\n                                <div class=\"h3 mb-0 font-weight-bold text-gray-800\">{{supervisers.employees.length}}</div>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <!-- Earnings (Monthly) Card Example -->\r\n        <div class=\"col-xl-3 col-md-6 mb-4\">\r\n            <div class=\"card border-left-danger shadow h-100 py-2\">\r\n                <div class=\"card-body\">\r\n                    <a href=\"javascript:void(0)\" (click)=\"showTableContent('Emergency Notifications')\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-l font-weight-bold text-danger text-uppercase mb-1\">Emergency Messages</div>\r\n                                <div class=\"h3 mb-0 font-weight-bold text-gray-800\">{{supervisers.emergencyMsg.length}}</div>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-xl-3 col-md-6 mb-4\" *ngIf=\"userType!='director'\">\r\n            <div class=\"card border-left-warning shadow h-100 py-2\">\r\n                <div class=\"card-body\">\r\n                    <a href=\"javascript:void(0)\" (click)=\"showTableContent('Survey Messages')\">\r\n                        <div class=\"row no-gutters align-items-center\">\r\n                            <div class=\"col mr-2\">\r\n                                <div class=\"text-l font-weight-bold text-warning text-uppercase mb-1\">Survey Messages</div>\r\n                                <div class=\"h3 mb-0 font-weight-bold text-gray-800\">{{supervisers.surveyMsg.length}}</div>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\" *ngIf=\"tableRecords\">\r\n        <div class=\"col-xl-12 col-md-12 mb-4\">\r\n            <div class=\"card shadow mb-4\">\r\n                <div class=\"card-header  py-3 d-sm-flex align-items-center justify-content-between mb-4\">\r\n                    <h6 class=\"m-0 font-weight-bold text-primary\">{{tableTitle}}</h6>\r\n                </div>\r\n                <div class=\"card-body\" *ngIf=\"tableTitle == 'Managers' || tableTitle == 'Supervisor' || tableTitle == 'Employees'\">\r\n                    <table [dtOptions]=\"dtOptions\" class=\"table table-bordered text-center\" datatable width=\"100%\" cellspacing=\"0\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>Created At</th>\r\n                                <th>Full Name</th>\r\n                                <th>Email</th>\r\n                                <th>Department</th>\r\n                                <th>Added By</th>\r\n\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let item of tableRecords; let j=index\">\r\n                                <td>{{item.created_at | date: 'MM/dd/yyyy'}}</td>\r\n                                <td>{{item.name}}</td>\r\n                                <td>\r\n                                    <a *ngIf=\"tableTitle == 'Managers'\" href=\"javascript:void(0)\" (click)=\"switchToManager(item.id)\"><b>{{item.email}}</b></a>\r\n                                    <a *ngIf=\"tableTitle == 'Supervisor'\" href=\"javascript:void(0)\" (click)=\"switchToSuperviser(item.id)\"><b>{{item.email}}</b></a>\r\n                                    <a *ngIf=\"tableTitle == 'Employees'\" [routerLink]=\"['/admin/survey-report/employee-report-details',item.id]\"><b>{{item.email}}</b></a>\r\n                                </td>\r\n                                <td>{{item.department}}</td>\r\n                                <td>{{item.added.name}}</td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n                <div class=\"card-body\" *ngIf=\"tableTitle == 'Emergency Notifications' || tableTitle == 'Survey Messages'\">\r\n                    <table [dtOptions]=\"dtOptions\" class=\"table table-bordered text-center\" datatable width=\"100%\" cellspacing=\"0\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>Created At</th>\r\n                                <th>Title</th>\r\n                                <th>Message</th>\r\n                                <th>Send To</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let item of tableRecords; let j=index\">\r\n                                <td>{{item.created_at | date: 'MM/dd/yyyy'}}</td>\r\n                                <td>{{item.title}}</td>\r\n                                <td>{{item.message}}</td>\r\n                                <td>{{item.send_to.name}}</td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<ngx-spinner></ngx-spinner>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/survey-reports.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/survey-reports.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Begin Page Content -->\r\n<div class=\"container-fluid\">\r\n    <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\r\n        <li class=\"nav-item\" *ngIf=\"userType == 'dev' || userType == 'admin'\">\r\n            <a class=\"nav-link \" [ngClass]=\"{'active': userType == 'dev' || userType == 'admin'}\" id=\"home-tab\" data-toggle=\"tab\" href=\"#home\" role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">Directors</a>\r\n        </li>\r\n        <li class=\"nav-item\" *ngIf=\"userType == 'dev' || userType == 'admin' || userProfile?.manage_managers == 'true'\">\r\n            <a class=\"nav-link\" [ngClass]=\"{'active': userType == 'director'}\" id=\"profile-tab\" data-toggle=\"tab\" href=\"#profile\" role=\"tab\" aria-controls=\"profile\" aria-selected=\"false\">Managers</a>\r\n        </li>\r\n        <li class=\"nav-item\" *ngIf=\"userType == 'dev' || userType == 'admin' || userProfile?.manage_supervisors == 'true'\">\r\n            <a class=\"nav-link \" [ngClass]=\"{'active': userType == 'manager'}\" id=\"super-tab\" data-toggle=\"tab\" href=\"#superviser\" role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">Supervisors</a>\r\n        </li>\r\n\r\n        <li class=\"nav-item\" *ngIf=\"userType == 'dev' || userType == 'admin' || userProfile?.manage_employees == 'true'\">\r\n            <a class=\"nav-link\" [ngClass]=\"{'active': userType == 'superviser'}\" id=\"contact-tab\" data-toggle=\"tab\" href=\"#contact\" role=\"tab\" aria-controls=\"contact\" aria-selected=\"false\">Employees</a>\r\n        </li>\r\n        <li class=\"nav-item\" *ngIf=\"userType == 'dev' || userType == 'admin' || userProfile?.manage_reports == 'true'\">\r\n            <a class=\"nav-link\" id=\"report-tab\" data-toggle=\"tab\" href=\"#report\" role=\"tab\" aria-controls=\"report\" aria-selected=\"false\">Survey Reporting</a>\r\n        </li>\r\n    </ul>\r\n    <!-- [ngClass]=\"{'active': userType == 'manager','show': userType == 'manager'}\" -->\r\n    <div class=\"tab-content\" id=\"myTabContent\">\r\n        <div *ngIf=\"userType == 'dev' || userType == 'admin'\" class=\"tab-pane fade show active\" id=\"home\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xl-12 col-md-12 mb-4\">\r\n                    <div class=\"card shadow mb-4\">\r\n                        <div class=\"card-header  py-3 d-sm-flex align-items-center justify-content-between mb-4\">\r\n                            <h6 class=\"m-0 font-weight-bold text-primary\">Directors</h6>\r\n                            <div class=\"row\">\r\n                                <!-- <a href=\"javascript:void(0)\" (click)=\"onRefresh('director')\" title=\"Refresh\" class=\"btn btn-primary sm-icon marginButtonRight\"><i class=\"fa fa-retweet\"></i></a>\r\n                                <input style=\"width: auto;\" [(ngModel)]=\"filterDate\" type=\"date\" class=\"form-control\" (change)=\"changeValues($event,'director')\"> -->\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card-body\">\r\n                            <table *ngIf=\"directors\" id=\"myTable\" class=\"table table-bordered text-center\" [dtOptions]=\"dtOptions\" datatable width=\"100%\" cellspacing=\"0\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th>Created At</th>\r\n                                        <th>Full Name</th>\r\n                                        <th>Email</th>\r\n                                        <th>Department</th>\r\n                                        <th>Added By</th>\r\n\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of directors; let j=index\">\r\n                                        <td>{{item.created_at | date: 'MM/dd/yyyy'}}</td>\r\n                                        <td>{{item.name}}</td>\r\n                                        <td><a [routerLink]=\"['report-details',item.id]\"><b>{{item.email}}</b></a></td>\r\n                                        <td>{{item.department}}</td>\r\n                                        <td>{{item.added.name}}</td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div [ngClass]=\"{'active': userType == 'manager','show': userType == 'manager'}\" *ngIf=\"userType == 'dev' || userType == 'admin' || userProfile?.manage_supervisors == 'true'\" class=\"tab-pane fade\" id=\"superviser\" role=\"tabpanel\" aria-labelledby=\"super-tab\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xl-12 col-md-12 mb-4\">\r\n                    <div class=\"card shadow mb-4\">\r\n                        <div class=\"card-header  py-3 d-sm-flex align-items-center justify-content-between mb-4\">\r\n                            <h6 class=\"m-0 font-weight-bold text-primary\">Supervisors</h6>\r\n                            <div class=\"row\">\r\n                                <!-- <a href=\"javascript:void(0)\" (click)=\"onRefresh('superviser')\" title=\"Refresh\" class=\"btn btn-primary sm-icon marginButtonRight\"><i class=\"fa fa-retweet\"></i></a>\r\n                                <input style=\"width: auto;\" [(ngModel)]=\"filterDate\" type=\"date\" class=\"form-control\" (change)=\"changeValues($event,'superviser')\"> -->\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card-body\" *ngIf=\"supervisors\">\r\n                            <table class=\"table table-bordered text-center\" [dtOptions]=\"dtOptions\" datatable width=\"100%\" cellspacing=\"0\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th>Created At</th>\r\n                                        <th>Full Name</th>\r\n                                        <th>Email</th>\r\n                                        <th>Department</th>\r\n                                        <th>Added By</th>\r\n\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of supervisors; let j=index\">\r\n                                        <td>{{item.created_at | date: 'MM/dd/yyyy'}}</td>\r\n                                        <td>{{item.name}}</td>\r\n                                        <td><a [routerLink]=\"['report-details',item.id]\"><b>{{item.email}}</b></a></td>\r\n                                        <td>{{item.department}}</td>\r\n                                        <td>{{item.added.name}}</td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div [ngClass]=\"{'active': userType == 'director','show': userType == 'director'}\" *ngIf=\"userType == 'dev' || userType == 'admin' || userProfile?.manage_managers == 'true'\" class=\"tab-pane fade\" id=\"profile\" role=\"tabpanel\" aria-labelledby=\"profile-tab\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xl-12 col-md-12 mb-4\">\r\n                    <div class=\"card shadow mb-4\">\r\n                        <div class=\"card-header  py-3 d-sm-flex align-items-center justify-content-between mb-4\">\r\n                            <h6 class=\"m-0 font-weight-bold text-primary\">Managers</h6>\r\n                            <div class=\"row\">\r\n                                <!-- <a href=\"javascript:void(0)\" (click)=\"onRefresh('manager')\" title=\"Refresh\" class=\"btn btn-primary sm-icon marginButtonRight\"><i class=\"fa fa-retweet\"></i></a>\r\n                                <input style=\"width: auto;\" [(ngModel)]=\"filterDate\" type=\"date\" class=\"form-control\" (change)=\"changeValues($event,'manager')\"> -->\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card-body\" *ngIf=\"managers\">\r\n                            <table class=\"table table-bordered text-center\" [dtOptions]=\"dtOptions\" datatable width=\"100%\" cellspacing=\"0\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th>Created At</th>\r\n                                        <th>Full Name</th>\r\n                                        <th>Email</th>\r\n                                        <th>Department</th>\r\n                                        <th>Added By</th>\r\n\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of managers; let j=index\">\r\n                                        <td>{{item.created_at | date: 'MM/dd/yyyy'}}</td>\r\n                                        <td>{{item.name}}</td>\r\n                                        <td><a [routerLink]=\"['report-details',item.id]\"><b>{{item.email}}</b></a></td>\r\n                                        <td>{{item.department}}</td>\r\n                                        <td>{{item.added.name}}</td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div [ngClass]=\"{'active': userType == 'superviser','show': userType == 'superviser'}\" *ngIf=\"userType == 'dev' || userType == 'admin' || userProfile?.manage_employees == 'true'\" class=\"tab-pane fade\" id=\"contact\" role=\"tabpanel\" aria-labelledby=\"contact-tab\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xl-12 col-md-12 mb-4\">\r\n                    <div class=\"card shadow mb-4\">\r\n                        <div class=\"card-header  py-3 d-sm-flex align-items-center justify-content-between mb-4\">\r\n                            <h6 class=\"m-0 font-weight-bold text-primary\">Employees</h6>\r\n                            <div class=\"row\">\r\n                                <!-- <a href=\"javascript:void(0)\" (click)=\"onRefresh('employee')\" title=\"Refresh\" class=\"btn btn-primary sm-icon marginButtonRight\"><i class=\"fa fa-retweet\"></i></a>\r\n                                <input style=\"width: auto;\" [(ngModel)]=\"filterDate\" type=\"date\" class=\"form-control\" (change)=\"changeValues($event,'employee')\"> -->\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card-body\" *ngIf=\"employees\">\r\n                            <table class=\"table table-bordered text-center\" [dtOptions]=\"dtOptions\" datatable width=\"100%\" cellspacing=\"0\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th>Created At</th>\r\n                                        <th>Full Name</th>\r\n                                        <th>Email</th>\r\n                                        <th>Department</th>\r\n\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let item of employees; let j=index\">\r\n                                        <td>{{item.created_at | date: 'MM/dd/yyyy'}}</td>\r\n                                        <td>{{item.name}}</td>\r\n                                        <td><a [routerLink]=\"['employee-report-details',item.id]\"><b>{{item.email}}</b></a></td>\r\n                                        <td>{{item.department}}</td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div *ngIf=\"userType == 'dev' || userType == 'admin'  || userProfile?.manage_reports == 'true'\" class=\"tab-pane fade\" id=\"report\" role=\"tabpanel\" aria-labelledby=\"report-tab\">\r\n            <div class=\"p-2\">\r\n                <div class=\"card\">\r\n                    <div class=\"card shadow mb-4\">\r\n                        <div class=\"card-header  py-3 d-sm-flex align-items-center justify-content-between mb-4\">\r\n                            <h6 class=\"m-0 font-weight-bold text-primary\">Report Filters</h6>\r\n                        </div>\r\n                        <div class=\"card-body\">\r\n                            <form>\r\n                                <div class=\"form-row mb-2\">\r\n                                    <div class=\"col-4 mb-2\">\r\n                                        <mat-form-field>\r\n                                            <label>Role*</label>\r\n                                            <select class=\"form-control\" [formControl]=\"RoleControl\">\r\n                                                <option *ngFor=\"let item of Roles\" value=\"{{item.value}}\">\r\n                                                    {{item.name}}\r\n                                                </option>\r\n                                            </select>\r\n                                        </mat-form-field>\r\n                                    </div>\r\n                                    <div class=\"col-4 mb-2\">\r\n                                        <label>Department</label>\r\n                                        <select *ngIf=\"userType !='manager' && userType !='superviser'\"  class=\"form-control\" [(ngModel)]=\"selectedDepartment\" [ngModelOptions]=\"{standalone: true}\" (change)=\"changeDepartment($event)\">\r\n                                                <option *ngFor=\"let item of departments\" value=\"{{item.value}}\">{{item.department}}</option>\r\n                                            </select>\r\n                                            <select *ngIf=\"userType =='manager' || userType =='superviser'\"  class=\"form-control\" [(ngModel)]=\"selectedDepartment\" [ngModelOptions]=\"{standalone: true}\" (change)=\"changeDepartment($event)\">\r\n                                                <option value=\"{{department}}\">Select Department</option>\r\n                                                <option value=\"{{department}}\">{{department}}</option>\r\n                                            </select>\r\n                                    </div>\r\n                                    <div class=\"col-4 mb-2\">\r\n                                        <mat-form-field>\r\n                                            <label>Employee</label>\r\n                                            <input class=\"form-control\" type=\"text\" placeholder=\"Choose Employee\" aria-label=\"Number\" matInput [formControl]=\"employeeControl\" [matAutocomplete]=\"autos\">\r\n                                            <mat-autocomplete #autos=\"matAutocomplete\">\r\n                                                <mat-option *ngFor=\"let option of employeefilteredOptions | async\" [value]=\"option\">\r\n                                                    {{option}}\r\n                                                </mat-option>\r\n                                            </mat-autocomplete>\r\n                                        </mat-form-field>\r\n                                    </div>\r\n                                    <div class=\"col-6\">\r\n                                        <label>From Date</label>\r\n                                        <input class=\"form-control\" type=\"date\" placeholder=\"Choose Date\" [formControl]=\"dateControl\">\r\n                                    </div>\r\n                                    <div class=\"col-6\">\r\n                                        <label>To Date</label>\r\n                                        <input class=\"form-control\" type=\"date\" placeholder=\"Choose Date\" [formControl]=\"enddateControl\">\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-6\">\r\n                                        <button (click)=\"getReportsData('login')\" class=\"btn btn-primary mb-2 btn-block\">Get Login Survey Report</button>\r\n                                    </div>\r\n                                    <div class=\"col-6\">\r\n                                        <button (click)=\"getReportsData1('other')\" [disabled]=\"selectedDepartment == '' || employeeControl.value == ''\" class=\"btn btn-primary mb-2 btn-block\">Get Other Survey Report</button>\r\n                                    </div>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- /.container-fluid -->\r\n<ngx-spinner></ngx-spinner>");

/***/ }),

/***/ "./src/app/components/dashboard/survey-reports/eemployeereportdetail/eemployeereportdetail.component.css":
/*!***************************************************************************************************************!*\
  !*** ./src/app/components/dashboard/survey-reports/eemployeereportdetail/eemployeereportdetail.component.css ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL3N1cnZleS1yZXBvcnRzL2VlbXBsb3llZXJlcG9ydGRldGFpbC9lZW1wbG95ZWVyZXBvcnRkZXRhaWwuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/components/dashboard/survey-reports/eemployeereportdetail/eemployeereportdetail.component.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/app/components/dashboard/survey-reports/eemployeereportdetail/eemployeereportdetail.component.ts ***!
  \**************************************************************************************************************/
/*! exports provided: EemployeereportdetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EemployeereportdetailComponent", function() { return EemployeereportdetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_services_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var src_app_shared_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/auth.service */ "./src/app/shared/auth.service.ts");







let EemployeereportdetailComponent = class EemployeereportdetailComponent {
    constructor(toast, spinner, api, auth, active) {
        this.toast = toast;
        this.spinner = spinner;
        this.api = api;
        this.auth = auth;
        this.active = active;
        this.userType = null;
        this.tableTitle = null;
        this.tableRecords = [];
        this.emergency = [];
        this.survey = [];
        this.submitLogin = [];
        this.submitOther = [];
        this.active.params.subscribe((data) => {
            this.getDetailById(data.id);
        });
    }
    ngOnInit() {
    }
    getDetailById(id) {
        this.spinner.show();
        this.api.get('getUserDetailById/' + id).subscribe((data) => {
            this.spinner.hide();
            this.userType = data.data.user_type;
            this.userName = data.data.name;
            this.submitLogin = data.data.survey_submitted;
            this.submitOther = data.data.other_survey_submitted;
            this.emergency = data.data.emergency_msg_employee;
            this.survey = data.data.survey_msg_employee;
        });
    }
    showTableContent(type) {
        this.tableRecords = null;
        this.tableTitle = type;
        if (type == 'Emergency Messages') {
            this.tableRecords = this.emergency;
        }
        else if (type == 'Survey Messages') {
            this.tableRecords = this.survey;
        }
        else if (type == 'Login Surveys') {
            this.tableRecords = this.submitLogin;
        }
        else if (type == 'Other Surveys') {
            this.tableRecords = this.submitOther;
        }
    }
};
EemployeereportdetailComponent.ctorParameters = () => [
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"] },
    { type: src_app_services_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: src_app_shared_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
];
EemployeereportdetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-eemployeereportdetail',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./eemployeereportdetail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/eemployeereportdetail/eemployeereportdetail.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./eemployeereportdetail.component.css */ "./src/app/components/dashboard/survey-reports/eemployeereportdetail/eemployeereportdetail.component.css")).default]
    })
], EemployeereportdetailComponent);



/***/ }),

/***/ "./src/app/components/dashboard/survey-reports/generate-report/generate-report.component.css":
/*!***************************************************************************************************!*\
  !*** ./src/app/components/dashboard/survey-reports/generate-report/generate-report.component.css ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL3N1cnZleS1yZXBvcnRzL2dlbmVyYXRlLXJlcG9ydC9nZW5lcmF0ZS1yZXBvcnQuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/components/dashboard/survey-reports/generate-report/generate-report.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/components/dashboard/survey-reports/generate-report/generate-report.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: GenerateReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenerateReportComponent", function() { return GenerateReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../../services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");






let GenerateReportComponent = class GenerateReportComponent {
    constructor(toast, spinner, api, active) {
        this.toast = toast;
        this.spinner = spinner;
        this.api = api;
        this.active = active;
        this.questions = [];
        this.dtOptions = {};
        this.result = false;
    }
    ngOnInit() {
        this.result = true;
        this.dtOptions = {
            order: [0, 'asc'],
            pageLength: 50
        };
        this.active.params.subscribe((data) => {
            if (data.type == 'Other Surveys') {
                this.getOtherSurveys(data.id, data.user);
            }
            else {
                this.getSurveys(data.id, data.user);
            }
        });
    }
    getSurveys(id, user) {
        this.surveys = null;
        this.submittedSurvey = null;
        this.spinner.show();
        this.api.get('submittedLoginSurveysDetails/' + id + '/' + user).subscribe((data) => {
            this.spinner.hide();
            if (!data.error) {
                this.surveys = data.surveys;
                this.submittedSurvey = data.submittedSurvey;
            }
        });
    }
    getOtherSurveys(id, user) {
        this.surveys = null;
        this.spinner.show();
        this.api.get('submittedOtherSurveysDetails/' + id + '/' + user).subscribe((data) => {
            this.spinner.hide();
            if (!data.error) {
                this.surveys = data.surveys;
                this.questions = data.surveys.survey.question;
                console.log(this.questions);
            }
        });
    }
    printWindow() {
        var printContents = document.getElementById('print-div').innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
    matchAnswers(q_index) {
        const surveyAnswer = this.surveys[q_index].answer;
        const expectedAnswer = this.surveys[q_index].questions.expected_ans;
        if (surveyAnswer == expectedAnswer) {
            return true;
        }
        else {
            this.result = false;
            return false;
        }
    }
};
GenerateReportComponent.ctorParameters = () => [
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"] },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }
];
GenerateReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
        selector: 'app-generate-report',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./generate-report.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/generate-report/generate-report.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./generate-report.component.css */ "./src/app/components/dashboard/survey-reports/generate-report/generate-report.component.css")).default]
    })
], GenerateReportComponent);



/***/ }),

/***/ "./src/app/components/dashboard/survey-reports/reportdetail/reportdetail.component.css":
/*!*********************************************************************************************!*\
  !*** ./src/app/components/dashboard/survey-reports/reportdetail/reportdetail.component.css ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL3N1cnZleS1yZXBvcnRzL3JlcG9ydGRldGFpbC9yZXBvcnRkZXRhaWwuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/components/dashboard/survey-reports/reportdetail/reportdetail.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/components/dashboard/survey-reports/reportdetail/reportdetail.component.ts ***!
  \********************************************************************************************/
/*! exports provided: ReportdetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportdetailComponent", function() { return ReportdetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var src_app_services_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var src_app_shared_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/auth.service */ "./src/app/shared/auth.service.ts");







let ReportdetailComponent = class ReportdetailComponent {
    constructor(toast, spinner, api, auth, active) {
        this.toast = toast;
        this.spinner = spinner;
        this.api = api;
        this.auth = auth;
        this.active = active;
        this.userType = null;
        this.tableTitle = null;
        this.tableRecords = [];
        this.supervisers = {
            supervisors: [],
            managers: [],
            employees: [],
            emergencyMsg: [],
            surveyMsg: []
        };
        this.active.params.subscribe((data) => {
            this.getDetailById(data.id);
        });
    }
    ngOnInit() {
        this.dtOptions = {
            order: [0, 'desc'],
            dom: 'Bfrtip',
            buttons: [
                'pageLength', 'copy', 'csv', 'excel', 'print',
            ],
            select: true
        };
    }
    getDetailById(id) {
        this.spinner.show();
        this.api.get('getUserDetailById/' + id).subscribe((data) => {
            this.spinner.hide();
            this.userType = data.data.user_type;
            this.userName = data.data.name;
            if (this.userType == 'director') {
                this.supervisers.managers = data.data.department_manager;
                this.supervisers.supervisors = data.data.department_superviser;
                this.supervisers.employees = data.data.department_employees;
                this.supervisers.emergencyMsg = data.data.emergency_msg;
                this.supervisers.surveyMsg = data.data.survey_msg;
            }
            else if (this.userType == 'manager') {
                this.supervisers.employees = data.data.department_employees;
                this.supervisers.supervisors = data.data.department_superviser;
                this.supervisers.emergencyMsg = data.data.emergency_msg;
                this.supervisers.surveyMsg = data.data.survey_msg;
            }
            else {
                this.supervisers.employees = data.data.manager_employees;
                this.supervisers.emergencyMsg = data.data.emergency_msg;
                this.supervisers.surveyMsg = data.data.survey_msg;
            }
        });
    }
    showTableContent(type) {
        this.tableRecords = null;
        this.tableTitle = type;
        if (type == 'Managers') {
            this.tableRecords = this.supervisers.managers;
        }
        else if (type == 'Supervisor') {
            this.tableRecords = this.supervisers.supervisors;
        }
        else if (type == 'Employees') {
            this.tableRecords = this.supervisers.employees;
        }
        else if (type == 'Emergency Notifications') {
            this.tableRecords = this.supervisers.emergencyMsg;
        }
        else if (type == 'Survey Messages') {
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
};
ReportdetailComponent.ctorParameters = () => [
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"] },
    { type: src_app_services_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] },
    { type: src_app_shared_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
];
ReportdetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-reportdetail',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./reportdetail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/reportdetail/reportdetail.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./reportdetail.component.css */ "./src/app/components/dashboard/survey-reports/reportdetail/reportdetail.component.css")).default]
    })
], ReportdetailComponent);



/***/ }),

/***/ "./src/app/components/dashboard/survey-reports/survey-reports.component.css":
/*!**********************************************************************************!*\
  !*** ./src/app/components/dashboard/survey-reports/survey-reports.component.css ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mystyle {\r\n    color: white !important;\r\n    background-color: #004F59 !important;\r\n}\r\n\r\n.dt-button-collection {\r\n    margin-top: -35px !important;\r\n    margin-left: 135px !important;\r\n}\r\n\r\n/* .dataTables_length {\r\n    margin-left: 4px !important;\r\n    float: right !important;\r\n}\r\n\r\n.dataTables_filter {\r\n    margin-top: -36px !important;\r\n} */\r\n\r\n.form-control {\r\n    text-transform: capitalize;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvc3VydmV5LXJlcG9ydHMvc3VydmV5LXJlcG9ydHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHVCQUF1QjtJQUN2QixvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSw0QkFBNEI7SUFDNUIsNkJBQTZCO0FBQ2pDOztBQUdBOzs7Ozs7O0dBT0c7O0FBQ0g7SUFDSSwwQkFBMEI7QUFDOUIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9zdXJ2ZXktcmVwb3J0cy9zdXJ2ZXktcmVwb3J0cy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm15c3R5bGUge1xyXG4gICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA0RjU5ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5kdC1idXR0b24tY29sbGVjdGlvbiB7XHJcbiAgICBtYXJnaW4tdG9wOiAtMzVweCAhaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEzNXB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcblxyXG4vKiAuZGF0YVRhYmxlc19sZW5ndGgge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDRweCAhaW1wb3J0YW50O1xyXG4gICAgZmxvYXQ6IHJpZ2h0ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5kYXRhVGFibGVzX2ZpbHRlciB7XHJcbiAgICBtYXJnaW4tdG9wOiAtMzZweCAhaW1wb3J0YW50O1xyXG59ICovXHJcbi5mb3JtLWNvbnRyb2wge1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbn0iXX0= */");

/***/ }),

/***/ "./src/app/components/dashboard/survey-reports/survey-reports.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/components/dashboard/survey-reports/survey-reports.component.ts ***!
  \*********************************************************************************/
/*! exports provided: SurveyReportsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyReportsComponent", function() { return SurveyReportsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_shared_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/auth.service */ "./src/app/shared/auth.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! exceljs */ "./node_modules/exceljs/dist/exceljs.min.js");
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");










let SurveyReportsComponent = class SurveyReportsComponent {
    constructor(toast, spinner, api, auth) {
        this.toast = toast;
        this.spinner = spinner;
        this.api = api;
        this.auth = auth;
        this.dtOptions = {};
        this.userType = this.auth.getCurrentUserType();
        this.department = localStorage.getItem('department');
        this.filterDate = null;
        // Tab5 Filter
        this.Roles = [];
        this.departments = [
            { 'value': 'All Departments', department: 'All Departments' }
        ];
        this.employeess = ['All Employees'];
        this.departmentControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
        this.dateControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
        this.enddateControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
        this.employeeControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
        this.RoleControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required);
        this.departmentsData = JSON.parse(localStorage.getItem('departments'));
    }
    ngOnInit() {
        if (this.userType == 'dev' || this.userType == 'admin') {
            this.departmentsData.forEach(element => {
                this.departments.push(element);
            });
            this.Roles.push({ name: 'Directors', value: 'director' }, { name: 'Managers', value: 'manager' }, { name: 'Supervisors', value: 'superviser' }, { name: 'Employees', value: 'employee' });
        }
        else if (this.userType == 'director') {
            let data = JSON.parse(this.department);
            data.forEach(element => {
                this.departments.push({ value: element, department: element });
            });
            this.Roles.push({ name: 'Managers', value: 'manager' }, { name: 'Supervisors', value: 'superviser' }, { name: 'Employees', value: 'employee' });
        }
        else {
            this.selectedDepartment = this.department;
            if (this.userType == 'manager') {
                this.Roles.push({ name: 'Supervisors', value: 'superviser' }, { name: 'Employees', value: 'employee' });
            }
            else {
                this.Roles.push({ name: 'Employees', value: 'employee' });
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
        this.getUserProfile();
        this.getReportsUsers();
    }
    getUserProfile() {
        this.auth.profileUser().subscribe(data => {
            this.userProfile = data.user;
        });
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
        });
    }
    getSurveys(type) {
        this.surveys = null;
        this.spinner.show();
        this.api.get('submittedLoginSurveys/' + type).subscribe((data) => {
            this.spinner.hide();
            if (!data.error) {
                this.surveys = data.surveys;
            }
        });
    }
    getOtherSurveys(type) {
        this.surveysOther = null;
        this.spinner.show();
        this.api.get('submittedOtherSurveys/' + type).subscribe((data) => {
            this.spinner.hide();
            if (!data.error) {
                this.surveysOther = data.surveys;
            }
        });
    }
    changeValue(ev) {
        this.getSurveys(ev);
    }
    dateChange(ev) {
        this.getSurveys(ev);
    }
    changeValue1(ev) {
        console.log(ev);
        this.getOtherSurveys(ev);
    }
    dateChange1(ev) {
        console.log(ev);
        this.getOtherSurveys(ev);
    }
    changeValues(ev, type) {
        this.directors = [];
        $('#myTable').DataTable();
        let tempArr = [];
        if (type == 'director') {
            this.directors = [];
            console.log(this.directors);
            // this.tempdirectors.filter((item) => {
            //   if(item.created_at.substr(0,10) == ev.target.value) {
            //     tempArr.push(item);
            //   }
            // })
            // this.directors = tempArr;
        }
        else if (type == 'manager') {
            this.managers.filter((item) => {
                if (item.created_at.substr(0, 10) == ev.target.value) {
                    tempArr.push(item);
                }
            });
            this.managers = null;
            this.managers = tempArr;
        }
        else if (type == 'superviser') {
            this.supervisors.filter((item) => {
                if (item.created_at.substr(0, 10) == ev.target.value) {
                    tempArr.push(item);
                }
            });
            this.supervisors = null;
            this.supervisors = tempArr;
        }
        else {
            this.employees.filter((item) => {
                if (item.created_at.substr(0, 10) == ev.target.value) {
                    tempArr.push(item);
                }
            });
            this.employees = null;
            this.employees = tempArr;
        }
    }
    onRefresh(type) {
        var table = $('#myTable').DataTable();
        table.clear();
        this.directors = this.tempdirectors;
        this.directors.forEach(element => {
            table.row.add([element.created_at, element.name, element.email, 1, 1]);
        });
        table.draw();
        console.log(this.tempdirectors);
        this.filterDate = null;
        if (type == 'director') {
            this.directors = this.tempdirectors;
        }
        else if (type == 'manager') {
            this.managers = this.tempmanagers;
        }
        else if (type == 'superviser') {
            this.supervisors = this.tempsupervisors;
        }
        else {
            this.employees = this.tempemployees;
        }
    }
    // Filters
    exportJsonToExcel(jsonData, check) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // jsonData.data.forEach((element,index) => {
            // });
            const workbook = new exceljs__WEBPACK_IMPORTED_MODULE_7__["Workbook"]();
            workbook.creator = 'Developer';
            workbook.lastPrinted = new Date();
            workbook.views =
                [
                    {
                        x: 0, y: 0, width: 10000, height: 20000,
                        firstSheet: 0, activeTab: 0, visibility: 'visible'
                    }
                ];
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
            yield jsonData.data.forEach((element) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                const sheet = workbook.addWorksheet(element.date, {
                    properties: { tabColor: { argb: 'FFC0000' } },
                    pageSetup: { fitToPage: true, fitToHeight: 5, fitToWidth: 7 },
                });
                let columns_array = [];
                columns_array = [
                    'Emplyee Name',
                    'Survey Name',
                    'Submitted At'
                ];
                yield element.questions.forEach(question => {
                    columns_array.push(question.question);
                });
                let header = sheet.addRow(columns_array);
                header.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "5b9bd5" },
                    bgColor: { argb: "FF000000" }
                };
                header.border = {
                    right: { style: 'thin', color: { argb: '000000' } }
                };
                if (element.surveys.length == 0) {
                    let inner_row = [];
                    inner_row = ['', '', '', 'No Survey Found'];
                    sheet.addRow(inner_row);
                }
                else {
                    yield element.surveys.forEach(survey => {
                        if (survey.user != null) {
                            let inner_row = [];
                            inner_row = [survey.user.name, jsonData.survey.name, survey.updated_at];
                            element.questions.forEach(q => {
                                let counter = 0;
                                let ans = '';
                                survey.empanswer.forEach(answer => {
                                    if (q.id == answer.question_id) {
                                        counter = 1;
                                        ans = answer.answer;
                                    }
                                });
                                if (counter == 1) {
                                    inner_row.push(ans);
                                }
                                else {
                                    inner_row.push(ans);
                                }
                            });
                            let rows = sheet.addRow(inner_row);
                            rows.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'deeaf6' },
                                bgColor: {
                                    argb: "FF000000"
                                }
                            };
                            rows.border = {
                                top: { style: 'thin', color: { argb: '000000' } },
                                right: { style: 'thin', color: { argb: '000000' } }
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
            }));
            const buffer = yield workbook.xlsx.writeBuffer();
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            const fileExtension = '.xlsx';
            const blob = new Blob([buffer], { type: fileType });
            Object(file_saver__WEBPACK_IMPORTED_MODULE_8__["saveAs"])(blob, 'Survey Reports(' + new Date() + ')' + fileExtension);
        });
    }
    getEmployees() {
        this.employeefilteredOptions = this.employeeControl.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(value => this._filterEmployees(value)));
    }
    _filterEmployees(value) {
        const filterValue = value.toLowerCase();
        return this.employeess.filter(option => option.toLowerCase().includes(filterValue));
    }
    changeDepartment(ev) {
        console.log(ev);
        this.employeess = ['All Employees'];
        this.spinner.show();
        const params = {
            department: this.selectedDepartment,
            role: this.RoleControl.value,
            type: 'departments'
        };
        this.api.post('filterReportData', params).subscribe((res) => {
            this.spinner.hide();
            res.data.forEach(element => {
                this.employeess.push(element.name);
            });
            this.getEmployees();
        });
    }
    getReportsData(Surveytype) {
        if (this.dateControl.value == '') {
            this.toast.warning('Please Select Start Date');
        }
        else if (this.enddateControl.value == '') {
            this.toast.warning('Please Select end Date');
        }
        else {
            this.spinner.show();
            const params = {
                department: this.selectedDepartment,
                date: this.dateControl.value,
                enddate: this.enddateControl.value,
                employee: this.employeeControl.value,
                type: 'data',
                role: this.RoleControl.value,
                surveyType: Surveytype
            };
            this.api.post('filterReportData', params).subscribe((res) => {
                this.spinner.hide();
                this.exportJsonToExcel(res, Surveytype);
                this.dateControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
                this.enddateControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
                this.employeeControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
            }, (error => {
                this.spinner.hide();
            }));
        }
    }
    exportJsonToExcel1(jsonData, check) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const workbook = new exceljs__WEBPACK_IMPORTED_MODULE_7__["Workbook"]();
            workbook.creator = 'Developer';
            workbook.lastPrinted = new Date();
            workbook.views =
                [
                    {
                        x: 0, y: 0, width: 10000, height: 20000,
                        firstSheet: 0, activeTab: 0, visibility: 'visible'
                    }
                ];
            yield jsonData.forEach(employee => {
                const sheet = workbook.addWorksheet(employee.name, {
                    properties: { tabColor: { argb: 'FFC0000' } },
                    pageSetup: { fitToPage: true, fitToHeight: 5, fitToWidth: 7 },
                });
                sheet.columns = [
                    { key: 'Question', width: 30 },
                    { key: 'Survey Name', width: 30 },
                    { key: 'Expected Answers', width: 30 },
                    { key: 'Employee Answers', width: 30 },
                    { key: 'Submitted At', width: 30 }
                ];
                let countRow = 0;
                let Arraylength = 0;
                Arraylength = employee.report_other_survey_submitted.length;
                if (Arraylength == 0) {
                    sheet.getCell('D1').value = 'No Survey Found';
                    sheet.getRow(2).values = [];
                }
                else {
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
                                { position: 0, color: { argb: '35d600a1' } },
                                { position: 0.5, color: { argb: '35d600a1' } },
                                { position: 1, color: { argb: '35d600a1' } }
                            ]
                        };
                        sheet.getRow(countRow).font = { bold: true };
                        countRow++;
                        sheet.addRow(['Question', 'Survey Name', 'Expected Answers', 'Employee Answers', 'Submitted At']);
                        sheet.getRow(countRow).font = { bold: true };
                        survey.survey.other_questions.forEach((q, index) => {
                            countRow++;
                            let answer = '';
                            answer = survey.empanswer[index].answer;
                            sheet.addRow([q.question, survey.survey.name, q.expected_ans, answer, survey.updated_at]);
                        });
                    });
                }
            });
            const buffer = yield workbook.xlsx.writeBuffer();
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            const fileExtension = '.xlsx';
            const blob = new Blob([buffer], { type: fileType });
            Object(file_saver__WEBPACK_IMPORTED_MODULE_8__["saveAs"])(blob, 'Survey Reports(' + new Date() + ')' + fileExtension);
        });
    }
    getReportsData1(Surveytype) {
        if (this.dateControl.value == '' && this.enddateControl.value != '') {
            this.toast.warning('Please Select Start Date');
        }
        else if (this.dateControl.value != '' && this.enddateControl.value == '') {
            this.toast.warning('Please Select end Date');
        }
        else {
            this.spinner.show();
            const params = {
                department: this.selectedDepartment,
                date: this.dateControl.value,
                enddate: this.enddateControl.value,
                employee: this.employeeControl.value,
                type: 'data',
                role: this.RoleControl.value,
                surveyType: Surveytype
            };
            this.api.post('filterReportDataOtherSurvey', params).subscribe((res) => {
                this.spinner.hide();
                console.log(res);
                this.exportJsonToExcel1(res.data, Surveytype);
                this.dateControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
                this.enddateControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
                this.employeeControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
            });
        }
    }
};
SurveyReportsComponent.ctorParameters = () => [
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"] },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"] },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"] },
    { type: src_app_shared_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] }
];
SurveyReportsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
        selector: 'app-survey-reports',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./survey-reports.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/dashboard/survey-reports/survey-reports.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./survey-reports.component.css */ "./src/app/components/dashboard/survey-reports/survey-reports.component.css")).default]
    })
], SurveyReportsComponent);



/***/ }),

/***/ "./src/app/components/dashboard/survey-reports/survey-reports.module.ts":
/*!******************************************************************************!*\
  !*** ./src/app/components/dashboard/survey-reports/survey-reports.module.ts ***!
  \******************************************************************************/
/*! exports provided: SurveyReportsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyReportsModule", function() { return SurveyReportsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var angular_datatables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-datatables */ "./node_modules/angular-datatables/index.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _survey_reports_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./survey-reports.component */ "./src/app/components/dashboard/survey-reports/survey-reports.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _generate_report_generate_report_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./generate-report/generate-report.component */ "./src/app/components/dashboard/survey-reports/generate-report/generate-report.component.ts");
/* harmony import */ var _reportdetail_reportdetail_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reportdetail/reportdetail.component */ "./src/app/components/dashboard/survey-reports/reportdetail/reportdetail.component.ts");
/* harmony import */ var _eemployeereportdetail_eemployeereportdetail_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./eemployeereportdetail/eemployeereportdetail.component */ "./src/app/components/dashboard/survey-reports/eemployeereportdetail/eemployeereportdetail.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm2015/autocomplete.js");












const routes = [
    {
        path: '',
        component: _survey_reports_component__WEBPACK_IMPORTED_MODULE_5__["SurveyReportsComponent"],
    },
    {
        path: 'report-details/:id',
        component: _reportdetail_reportdetail_component__WEBPACK_IMPORTED_MODULE_8__["ReportdetailComponent"],
    },
    {
        path: 'employee-report-details/:id',
        component: _eemployeereportdetail_eemployeereportdetail_component__WEBPACK_IMPORTED_MODULE_9__["EemployeereportdetailComponent"],
    },
    {
        path: 'report/:id/:user/:type',
        component: _generate_report_generate_report_component__WEBPACK_IMPORTED_MODULE_7__["GenerateReportComponent"],
    }
];
let SurveyReportsModule = class SurveyReportsModule {
};
SurveyReportsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        declarations: [
            _survey_reports_component__WEBPACK_IMPORTED_MODULE_5__["SurveyReportsComponent"],
            _generate_report_generate_report_component__WEBPACK_IMPORTED_MODULE_7__["GenerateReportComponent"],
            _reportdetail_reportdetail_component__WEBPACK_IMPORTED_MODULE_8__["ReportdetailComponent"],
            _eemployeereportdetail_eemployeereportdetail_component__WEBPACK_IMPORTED_MODULE_9__["EemployeereportdetailComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerModule"],
            angular_datatables__WEBPACK_IMPORTED_MODULE_1__["DataTablesModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__["MatAutocompleteModule"]
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["CUSTOM_ELEMENTS_SCHEMA"]]
    })
], SurveyReportsModule);



/***/ })

}]);
//# sourceMappingURL=survey-reports-survey-reports-module-es2015.js.map