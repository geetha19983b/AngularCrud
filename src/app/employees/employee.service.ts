import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, of, throwError } from 'rxjs';
//import 'rxjs/add/observable/of';
//import 'rxjs/add/operator/delay';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
  baseUrl = 'http://localhost:3000/employees';
  constructor(private httpClient: HttpClient) {
  }

  private listEmployees: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: '3',
      isActive: true,
      photoPath: 'assets/images/mark.png',
      password: null,
      confirmPassword: null

    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 2345978640,
      dateOfBirth: new Date('11/20/1979'),
      department: '2',
      isActive: true,
      photoPath: 'assets/images/mary.png',
      password: null,
      confirmPassword: null
    },
    {
      id: 3,
      name: 'John',
      gender: 'Male',
      contactPreference: 'Phone',
      phoneNumber: 5432978640,
      dateOfBirth: new Date('3/25/1976'),
      department: '3',
      isActive: false,
      photoPath: 'assets/images/john.png',
      password: null,
      confirmPassword: null
    },
  ];

  getEmployees(): Observable<Employee[]> {
    //return of(this.listEmployees).pipe(delay(2000));
    return this.httpClient.get<Employee[]>(this.baseUrl)
          .pipe(catchError(this.handleError));
  }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
  addEmployee(employee: Employee) :Observable<Employee> {
    //if (employee.id === null) {
      // reduce() method reduces the array to a single value. This method executes
      // the provided function for each element of the array (from left-to-right)
      // When we implement the server side service to save data to the database
      // table, we do not have to compute the id, as the server will assing it
      /* const maxId = this.listEmployees.reduce(function (e1, e2) {
        return (e1.id > e2.id) ? e1 : e2;
      }).id;
      employee.id = maxId + 1;

      this.listEmployees.push(employee); */
      return this.httpClient.post<Employee>('http://localhost:3000/employees',employee,
      {
        headers:new HttpHeaders({'Content-Type':'application/json'})
      }).pipe(catchError(this.handleError));

    // } else {
    //   const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
    //   this.listEmployees[foundIndex] = employee;
    // }
  }
  updateEmployee(employee:Employee):Observable<void>{
    return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`,employee,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }
  getEmployee(id: number): Observable<Employee> {
    //return this.listEmployees.find(e => e.id === id);
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }
  deleteEmployee(id: number) :Observable<void> {
    /* const i = this.listEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.listEmployees.splice(i, 1);
    } */
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError));


  }
}