import { Routes, RouterModule } from '@angular/router';

import { EmployeeRegistrationFormComponent } from './employee-registration-form/employee-registration-form.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: EmployeeRegistrationFormComponent },
    { path: 'home', component: HomeComponent },
     { path: 'employeeList', component: ListEmployeesComponent  },
     { path: '**', component: HomeComponent }

];

export const routing = RouterModule.forRoot(appRoutes);
