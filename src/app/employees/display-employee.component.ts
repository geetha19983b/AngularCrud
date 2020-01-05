import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
/* export class DisplayEmployeeComponent implements OnInit, OnChanges {
  @Input() employee:Employee;
  constructor() { }

  ngOnInit() {
  }
  // This life cycle hook receives SimpleChanges as an Input parameter
  // We can use it to retrieve previous and current values as shown below
  ngOnChanges(changes: SimpleChanges) {
    const previousEmployee = <Employee>changes.employee.previousValue;
    const currentEmployee = <Employee>changes.employee.currentValue;

    console.log('Previous : ' + (previousEmployee ? previousEmployee.name : 'NULL'));
    console.log('Current : ' + currentEmployee.name);
  }
} */

/* export class DisplayEmployeeComponent implements OnChanges {
  private _employee: Employee;

  @Input()
  set employee(val: Employee) {
    console.log('Previous: ' + (this._employee ? this._employee.name
      : 'NULL'));
    console.log('Current : ' + val.name);
    this._employee = val;
  }
  get employee(): Employee {
    return this._employee;
  }
  ngOnChanges(changes: SimpleChanges) {
    for (const propName of Object.keys(changes)) {

      const change = changes[propName];
      const from = JSON.stringify(change.previousValue);
      const to = JSON.stringify(change.currentValue);

      console.log(propName + ' changed from ' + from + ' to ' + to);
    }
  }
} */

export class DisplayEmployeeComponent implements OnInit
{
  @Input() employee:Employee;
  @Input() searchTerm: string;
  @Output() notify:EventEmitter<Employee>=new EventEmitter<Employee>();
  @Output() notifyDelete:EventEmitter<number> = new EventEmitter<number>();
  selectedEmployeeId: number;
  constructor(private _route:ActivatedRoute,private _router:Router,
    private _employeeService:EmployeeService){}
  ngOnInit()
  {
    this.selectedEmployeeId=+this._route.snapshot.paramMap.get('id');
  }
  handleClick()
  {
      this.notify.emit(this.employee);
  }
  getNameAndGender():string
  {
     return this.employee.name + ' ' + this.employee.gender;
  }
  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }
  editEmployee()
  {
    this._router.navigate(['/edit',this.employee.id]);
  }
  deleteEmployee()
  {
   // this._employeeService.deleteEmployee(this.employee.id);
   this._employeeService.deleteEmployee(this.employee.id).subscribe(
     () => console.log(`Employee with ID = ${this.employee.id} Deleted`),
     (err) => console.log(err)
   );
    this.notifyDelete.emit(this.employee.id);

  }
}
