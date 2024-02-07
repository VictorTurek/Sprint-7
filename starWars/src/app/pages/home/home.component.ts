import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { StarshipsListComponent } from '../../components/starships-list/starships-list.component';
import { CharactersListComponent } from '../../components/characters-list/characters-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, CommonModule, StarshipsListComponent, CharactersListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
