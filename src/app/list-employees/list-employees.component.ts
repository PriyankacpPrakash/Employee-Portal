import { Component, OnInit } from '@angular/core';
import { EmployeesDataSharedService } from '../employees-data-shared.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  public employeesArray;
  constructor(private employeesDataSharedService: EmployeesDataSharedService) { }

  ngOnInit() {
    this.employeesDataSharedService.getEmployeeListSubject().subscribe(employeeList => {
      this.employeesArray = employeeList;
    });

    if (this.employeesArray && this.employeesArray.length) {
      this.employeesArray.sort(this.sortNamesByAscending);
    }
  }

  public sortNamesByAscending(obj1, obj2) {
    if (obj1.firstName < obj2.firstName) { return -1; }
    if (obj1.firstName > obj2.firstName) { return 1; }
    return 0;
  }

}
