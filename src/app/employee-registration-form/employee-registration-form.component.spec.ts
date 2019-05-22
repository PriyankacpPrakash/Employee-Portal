import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeRegistrationFormComponent } from './employee-registration-form.component';
import { EmployeesDataSharedService } from '../employees-data-shared.service';

describe('EmployeeRegistrationFormComponent', () => {
  let component: EmployeeRegistrationFormComponent;
  let fixture: ComponentFixture<EmployeeRegistrationFormComponent>;
  let employeesDataSharedService: EmployeesDataSharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ EmployeeRegistrationFormComponent ],
      providers: [EmployeesDataSharedService]
        // providers: [ FormGroup, FormBuilder, Validators]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    employeesDataSharedService = TestBed.get(EmployeesDataSharedService);
    component.ngOnInit();
    spyOn(component, 'onSubmit').and.callThrough();
    spyOn(employeesDataSharedService, 'publishEmployeeList').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // create reusable function for a dry spec.
  function updateForm(firstName, lastName, gender, dateOfBirth, department) {
    component.registerForm.controls.firstName.setValue(firstName);
    component.registerForm.controls.lastName.setValue(lastName);
    component.registerForm.controls.gender.setValue(gender);
    component.registerForm.controls.dateOfBirth.setValue(dateOfBirth);
    component.registerForm.controls.department.setValue(department);
  }

  it('form value should update from form changes', fakeAsync(() => {
    const validEmployee = {
      firstName: 'Kanasu',
      lastName: 's',
      gender: 'feamle',
      dateOfBirth: '01/03/1990',
      department: 'IT'
    };
    updateForm(validEmployee.firstName, validEmployee.lastName, validEmployee.gender, validEmployee.dateOfBirth, validEmployee.department);
    expect(component.registerForm.value).toEqual(validEmployee);
  }));

  it('should update model on submit', fakeAsync(() => {
    const validEmployee = {
      firstName: 'bassu',
      lastName: 's',
      gender: 'male',
      dateOfBirth: '01/03/1992',
      department: 'HR'
    };
    updateForm(validEmployee.firstName, validEmployee.lastName, validEmployee.gender, validEmployee.dateOfBirth, validEmployee.department);
    component.onSubmit();
    expect(component.registerForm.value).toEqual(validEmployee);
    expect(component.registerForm.valid).toBeTruthy();
    expect(component.registerForm.invalid).toBeFalsy();
  }));

  it('should not update the form and should be in invalid state ', fakeAsync(() => {
    const invalidEmployee = {
      firstName: '',
      lastName: '',
      gender: 'male',
      dateOfBirth: '01/03/1992',
      department: 'HR'
    };
    updateForm(invalidEmployee.firstName, invalidEmployee.lastName, invalidEmployee.gender,
      invalidEmployee.dateOfBirth, invalidEmployee.department);
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
    expect(component.registerForm.value).toEqual(invalidEmployee);
    expect(component.registerForm.valid).toBeFalsy();
    expect(component.registerForm.invalid).toBeTruthy();
  }));

  describe('shared service', () => {
  it('should publish the latest value ', fakeAsync(() => {
    const validEmployee = {
      firstName: 'bassu',
      lastName: 's',
      gender: 'male',
      dateOfBirth: '01/03/1992',
      department: 'HR'
    };
    updateForm(validEmployee.firstName, validEmployee.lastName, validEmployee.gender, validEmployee.dateOfBirth, validEmployee.department);
    component.onSubmit();
    expect(employeesDataSharedService.publishEmployeeList).toBeDefined();
    expect(employeesDataSharedService.publishEmployeeList).toHaveBeenCalledTimes(1);
    expect(employeesDataSharedService.publishEmployeeList).toHaveBeenCalledWith(validEmployee);
  }));
});
});
