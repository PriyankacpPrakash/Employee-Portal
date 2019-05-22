import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesDataSharedService } from '../employees-data-shared.service';



@Component({
  selector: 'app-employee-registration-form',
  templateUrl: './employee-registration-form.component.html',
  styleUrls: ['./employee-registration-form.component.scss']
})
export class EmployeeRegistrationFormComponent implements OnInit {
  registerForm: FormGroup;
  public selectedOption: string;
  public submitted = false;

  constructor(private formBuilder: FormBuilder,
    private employeesDataSharedService: EmployeesDataSharedService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      department: ['', Validators.required]

    });
  }


  get formvalues() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const employeeData = JSON.parse(JSON.stringify(this.registerForm.value));
    this.employeesDataSharedService.publishEmployeeList(employeeData);
    this.resetForm();
  }

  resetForm(value: any = undefined): void {
    this.registerForm.reset(value);
    this.submitted = false;
  }
}
