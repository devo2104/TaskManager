import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

const routes: Routes = [
  {path: '', component: DataDisplayComponent},
  { path: 'task-detail/:id', component: TaskDetailComponent }, // backend and frontend have diff url
  {path: 'create-task', component: CreateTaskComponent}, // faltu mai frontslash mat do at end 
  {path: 'update-task/:id', component: UpdateTaskComponent},
  {path: 'delete-task/:id', component: DeleteTaskComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'login', component: LoginUserComponent},
  {path: 'create-employee', component: CreateEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
