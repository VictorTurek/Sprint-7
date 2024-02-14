import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

  reloadPage() {
    window.location.reload();
  }

  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['/login']); // Reemplaza 'login' con la ruta real de tu componente de login
  }

}
