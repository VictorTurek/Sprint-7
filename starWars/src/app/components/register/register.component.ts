import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/auth';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule, CommonModule, RouterLink, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {

  constructor(private fb: FormBuilder, private authService: AuthService, private messageService: MessageService, private router: Router) { }

  namePattern = '^(?=.*[a-zA-Z].*[a-zA-Z])[^\\s]+(\\s[^\\s]+)*$';

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.namePattern)]], // Solo letras y espacios
    lastName: ['', [Validators.required, Validators.pattern(this.namePattern)]], // Solo letras y espacios
    email: ['', [Validators.required, Validators.email]], // Email válido
    password: ['', [Validators.required]], // Mínimo 6 caracteres
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(group: FormGroup) {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    // Verificar si los controles existen y tienen valores
    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null); // Se usa "?." para manejar el caso de que confirmPasswordControl sea null
    }
  }


  get name() {
    return this.registerForm.controls['name'];
  }

  get lastName() {
    return this.registerForm.controls['lastName'];
  }


  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }


  submitDetails() {
    console.log("submit details");
    let postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(
      response => {
        console.log("response", response);
        this.router.navigate(['login'])
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register Completed' });
      },
      error => {
        console.log("response", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    )
  }

}
