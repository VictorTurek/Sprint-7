import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
