import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/Department';

// Import BsDatepickerConfig type. This is the Config object for datepicker. Using this
// config object we can set minDate, maxDate, whether to show/hide week numbers and
// change the color theme using the containerClass property.
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  
  @ViewChild('employeeForm', {static: true}) public createEmployeeForm: NgForm;
  gender = 'female';
  previewPhoto = false;
  // create a property of type Partial<BsDatepickerConfig>
  datePickerConfig: Partial<BsDatepickerConfig>;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' }
  ];
  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    contactPreference: null,
    phoneNumber: null,
    email: null,
    dateOfBirth: null,
    department: '-1',
    isActive: null,
    photoPath: null,
    password:null,
    confirmPassword:null
  };
  constructor(private _employeeService:EmployeeService,
    private _router:Router) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue',
    /*  showWeekNumbers: false,
     minDate: new Date(2018, 0, 1),
     maxDate: new Date(2018, 11, 31), */
     dateInputFormat: 'DD/MM/YYYY'
     });
  }

  ngOnInit() {
  }
  saveEmployee(): void {
    this._employeeService.saveEmployee(this.employee);
    this._router.navigate(['list']);
  }
  togglePhotoPreview()
  {
    this.previewPhoto = ! this.previewPhoto;
  }
}
