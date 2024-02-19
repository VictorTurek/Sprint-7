import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/auth';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();



  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern]],
  })

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.getUserByEmail(email).pipe(
      map(users => users.length > 0)
    );
  }

  login(loginData: any) {
    console.log("estamos en el login")
    let LogiInEmail: String = loginData.email
    let LogiInpassword: String = loginData.password
    console.log("email", LogiInEmail, "password", LogiInpassword)



    this.getUserByEmail(LogiInEmail as string).subscribe(
      (response: any[]) => {
        if (response.length > 0 && typeof response[0].password === 'string' && response[0].password === LogiInpassword) {
          sessionStorage.setItem('email', LogiInEmail as string);
          this.isLoggedInSubject.next(true);
          // Aquí puedes realizar cualquier otra acción relacionada con el inicio de sesión, como redirigir a la página principal
          this.router.navigate(['/starships-list']);
          console.log("this.isLoggedIn", this.isLoggedInSubject)
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'email or password is wrong' })
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' })
      }
    )
  }

  logout() {
    this.isLoggedInSubject.next(false);

    // Aquí puedes realizar cualquier otra acción relacionada con el cierre de sesión, como limpiar el almacenamiento de sesiones y redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
    console.log("this.isLoggedIn", this.isLoggedInSubject)
  }


}
