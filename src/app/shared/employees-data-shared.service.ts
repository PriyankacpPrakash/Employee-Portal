import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee-model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesDataSharedService {
  public employeesList: Employee[] = [];
  public employeeListSubject: ReplaySubject<any> = new ReplaySubject<any>();
  constructor() {

   }

  public publishEmployeeList(employeeData) {
    this.employeesList.push(employeeData);
    this.getEmployeeListSubject().next(this.employeesList);
  }

  public getEmployeeListSubject() {
    return this.employeeListSubject;
  }
}
