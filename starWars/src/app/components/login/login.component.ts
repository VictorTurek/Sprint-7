import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule, CommonModule, RouterLink, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern]],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,

  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }



  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.login({ email, password })
   
  }

}
