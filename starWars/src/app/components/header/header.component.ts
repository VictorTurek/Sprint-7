import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent implements OnDestroy, OnInit {

  isLoggedIn: boolean = false;

  private subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.subscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit() {
    console.log("sessionStorage", sessionStorage)
    if (sessionStorage.length > 0) {
      this.isLoggedIn = true
    }
  }

  ngOnDestroy() {
    console.log("logIn", this.isLoggedIn)
    this.subscription.unsubscribe();
  }


  reloadPage() {
    window.location.reload();
  }

  navigateToLogin() {
    //console.log("login en header component al hacer click en login", this.isLoggedIn )
    this.router.navigate(['/login']); // Reemplaza 'login' con la ruta real de tu componente de login
    //console.log("login en header component despues del routing", this.isLoggedIn )

  }



  navigateToSignUp() {
    this.router.navigate(['/register']); // Reemplaza 'login' con la ruta real de tu componente de login
  }

  logout() {
        this.authService.logout(); // Llama al método logout del servicio AuthService
  }

}
