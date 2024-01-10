import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthServiceService } from 'src/app/services/authServices/auth-service.service';
import { LocalstorageService } from 'src/app/services/locaStorage-service/localstorage.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthServiceService, private router: Router, private storageService: LocalstorageService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.apiService.loginUser(this.loginForm.value).subscribe(
          response => {
            console.log('User logged in successfully', response);
            // Save the token in local storage or use Angular AuthService for further authentication
            const token = response.token
            this.authService.setToken(token)
            const username = response.user.username
            console.log(username)
            this.apiService.checkSuperUser(username).subscribe(response => {
              const isSuperuser = response.superUser;
              localStorage.setItem('super-user', isSuperuser)
              console.log(response)
            })
            this.storageService.setUsername(username)
            this.router.navigate(['/'])
          }
      )
    }
  }
}
