import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListEmployeesComponent } from './list-employees.component';
import { EmployeesDataSharedService } from '../shared/employees-data-shared.service';

describe('ListEmployeesComponent', () => {
  let component: ListEmployeesComponent;
  let fixture: ComponentFixture<ListEmployeesComponent>;
  let employeesDataSharedService: EmployeesDataSharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmployeesComponent ],
      imports: [RouterTestingModule],
      providers: [ EmployeesDataSharedService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    employeesDataSharedService = TestBed.get(EmployeesDataSharedService);
    spyOn(component, 'sortNamesByAscending').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const employeeList = {
    firstName: 'bassu',
    lastName: 's',
    gender: 'male',
    dateOfBirth: '01/03/1992',
    department: 'HR'
  };

  it('should contain all employeelist ', () => {
    employeesDataSharedService.publishEmployeeList(employeeList);
    expect(component.employeesArray).toEqual([employeeList]);
  });

  it('should not call the sort function if employeelist length is one or empty ', () => {
    component.employeesArray = [];
    expect(component.sortNamesByAscending).toHaveBeenCalledTimes(0);
  });

  it('should call  the sort function if employeelist length is more than one ', () => {
    const employeeList2 = {
      firstName: 'kanasu',
      lastName: 's',
      gender: 'female',
      dateOfBirth: '01/03/1992',
      department: 'HR'
    };
    employeesDataSharedService.publishEmployeeList(employeeList);
    employeesDataSharedService.publishEmployeeList(employeeList2);
    expect(component.employeesArray).toEqual([employeeList, employeeList2]);
    component.ngOnInit();
    expect(component.sortNamesByAscending).toHaveBeenCalledTimes(1);
  });


});
