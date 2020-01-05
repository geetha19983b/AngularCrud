import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  dataFromChild: Employee;
  error: string;
  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  filterEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  // employeeToDisplay: Employee;
  //private arrayIndex = 1;

  constructor(private _employeeService: EmployeeService,
    private _router: Router, private _activatedRoute: ActivatedRoute
  ) {
    //this.employees = this._activatedRoute.snapshot.data['employeeList'];
    // resolvedData can either be a string or Employee[]
    const resolvedData: string | Employee[] = this._activatedRoute.snapshot.data['employeeList'];
    // If the resolver completed without errors resolvedData is an Employee[]
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }

    if (this._activatedRoute.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._activatedRoute.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit() {
    // this.employees = this._employeeService.getEmployees();
    /* this._employeeService.getEmployees().subscribe((empList) => {
       this.employees = empList;
       this._activatedRoute.queryParamMap.subscribe((qp) => {
         if(qp.has('searchTerm'))
         {
            this.searchTerm=qp.get('searchTerm');
         }
         else
        {
          this.filteredEmployees = this.employees;
        }
        });
    }); */
    // this.employeeToDisplay = this.employees[0];
    //this.filteredEmployees = this.employees;
    //snapshot approach
    /* if(this._activatedRoute.snapshot.queryParamMap.has('searchTerm'))
    {
       this.searchTerm = this._activatedRoute.snapshot.queryParamMap.get('searchTerm');
    }
    else
    {
      this.filteredEmployees = this.employees;
    } */
    //observable approach
    /* this._activatedRoute.queryParamMap.subscribe((qp) => {
     if(qp.has('searchTerm'))
     {
        this.searchTerm=qp.get('searchTerm');
     }
     else
    {
      this.filteredEmployees = this.employees;
    }
    }); */

  }
  changeEmployeeName() {
    this.employees[0].name = 'Jordan';
    /* const newEmployeeArray:Employee[]=Object.assign([],this.employees);
    newEmployeeArray[0].name='Jordan';
    this.employees=newEmployeeArray; */
    this.filteredEmployees = this.filterEmployees(this.searchTerm);
  }
  /*  nextEmployee(): void {
     if (this.employeeToDisplay.id <= 2) {
       this.employeeToDisplay = this.employees[this.arrayIndex];
       this.arrayIndex++;
     } else {
       this.employeeToDisplay = this.employees[0];
       this.arrayIndex = 1;
     }
   } */
  handleNotify(eventData: Employee) {
    this.dataFromChild = eventData;
  }
  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId], {
      queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
    });
  }
  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id == id);
    if (i != -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }
}
