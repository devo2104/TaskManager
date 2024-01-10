import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    DataDisplayComponent,
    TaskDetailComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    DeleteTaskComponent,
    RegisterUserComponent,
    LoginUserComponent,
    CreateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
