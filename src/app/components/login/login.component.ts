import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = '';
  showPassword: boolean = false;
  loginObj: any  = {    
      "userName": "",
      "password": ""    
  };

  users = [
    { userName: 'admin', password: 'admin', role:'admin' },
    { userName: 'user', password: 'user', role:'user' },
  ];

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
  const foundUser = this.users.find(user =>
    user.userName === this.loginObj.userName &&
    user.password === this.loginObj.password
  );

  if (foundUser) {
    this.errorMessage = '';
    localStorage.setItem('role', foundUser.role);
    this.router.navigate(['dashboard']);
  } else {
    this.errorMessage = 'Hibás felhasználónév vagy jelszó';
  }
}
}