import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/Department';

// Import BsDatepickerConfig type. This is the Config object for datepicker. Using this
// config object we can set minDate, maxDate, whether to show/hide week numbers and
// change the color theme using the containerClass property.
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  
  @ViewChild('employeeForm', {static: true}) public createEmployeeForm: NgForm;
  gender = 'female';
  previewPhoto = false;
  panelTitle:string;
  // create a property of type Partial<BsDatepickerConfig>
  datePickerConfig: Partial<BsDatepickerConfig>;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' }
  ];
  employee: Employee;
  constructor(private _employeeService:EmployeeService,
    private _router:Router,private _route:ActivatedRoute) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue',
    /*  showWeekNumbers: false,
     minDate: new Date(2018, 0, 1),
     maxDate: new Date(2018, 11, 31), */
     dateInputFormat: 'DD/MM/YYYY'
     });
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }
  private getEmployee(id:number)
  {
    if(id === 0)
    {
      this.employee = {
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
      this.createEmployeeForm.reset();
      this.panelTitle='Create Employee';
    }
    else
    {
      this.employee = Object.assign({},this._employeeService.getEmployee(id));
      this.panelTitle = 'Edit Employee';
    }
  }
  saveEmployee(): void {
    const newEmployee:Employee=Object.assign({},this.employee);
    this._employeeService.save(newEmployee);
    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }
  togglePhotoPreview()
  {
    this.previewPhoto = ! this.previewPhoto;
  }
}
