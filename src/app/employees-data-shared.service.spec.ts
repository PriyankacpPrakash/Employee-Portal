import { TestBed } from '@angular/core/testing';

import { EmployeesDataSharedService } from './employees-data-shared.service';

describe('EmployeesDataSharedService', () => {
  let employeesDataSharedService: EmployeesDataSharedService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [EmployeesDataSharedService]
  }));

  beforeEach(() => {
    employeesDataSharedService  = TestBed.get(EmployeesDataSharedService);
    spyOn(employeesDataSharedService, 'getEmployeeListSubject').and.callThrough();
  });

  it('should be created', () => {
    expect(employeesDataSharedService).toBeTruthy();
  });

  describe('publishEmployeeList', () => {
    const validEmployee = {
      firstName: 'Kanasu',
      lastName: 's',
      gender: 'feamle',
      dateOfBirth: '01/03/1990',
      department: 'IT'
    };

    it('should push the data to employeeArray and should call getEmployeeListSubject with all employee data', () => {
      employeesDataSharedService.publishEmployeeList(validEmployee);
      expect(employeesDataSharedService.getEmployeeListSubject).toHaveBeenCalled();
      expect(employeesDataSharedService.getEmployeeListSubject).toHaveBeenCalledTimes(1);
    });
});

});
