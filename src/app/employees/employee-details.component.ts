import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  private _id:number;
  constructor(private _route: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _router:Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this._id = +params.get('id');
      //this.employee=this._employeeService.getEmployee(this._id);
      this._employeeService.getEmployee(this._id).subscribe(
        (employee) => this.employee = employee,
        (err:any) => console.log(err)
      );
    });
    
  }
  getNextEmployee()
  {
    if (this._id < 3) {
      this._id = this._id + 1;
    } else {
      this._id = 1;
    }

    /* this._router.navigate(['/employees', this._id],{
      queryParamsHandling: 'preserve'
    }); */
    this._router.navigate(['/employees', this._id], {
      queryParams: { 'newParam': 'newValue' },
      queryParamsHandling: 'merge'
    });
  }
}
