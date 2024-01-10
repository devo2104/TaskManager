import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  register(): void{
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value)
      this.apiService.registerUser(this.registrationForm.value).subscribe(response => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login'])
      })
    }
  }
}
