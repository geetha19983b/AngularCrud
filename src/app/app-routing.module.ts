import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './employees/CreateEmployeeCanDeactivateGuardService';
import { EmployeeDetailsComponent } from './employees/employee-details.component';


const routes: Routes = [
  {path:'list',component:ListEmployeesComponent},
  {path:'create',component:CreateEmployeeComponent,
  canDeactivate: [CreateEmployeeCanDeactivateGuardService]},
  {
    path: 'employees/:id', component: EmployeeDetailsComponent
  },
  {path:'',redirectTo:'/list',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
