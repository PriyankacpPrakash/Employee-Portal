import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { EmployeeRegistrationFormComponent } from './employee-registration-form/employee-registration-form.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { EmployeesDataSharedService } from './employees-data-shared.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeRegistrationFormComponent,
    ListEmployeesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    routing
  ],
  providers: [EmployeesDataSharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
