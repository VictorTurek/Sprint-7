import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { StarshipsListComponent } from '../../components/starships-list/starships-list.component';
import { CharactersListComponent } from '../../components/characters-list/characters-list.component';
import { HomeListComponent } from '../../components/home-list/home-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, CommonModule, StarshipsListComponent, CharactersListComponent, HomeListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

  currentComponent: string = 'home';

  constructor() { }

  showComponent(component: string) {
    console.log("home" , component)
    this.currentComponent = component;
    console.log("currentComponent" , this.currentComponent)

  }

}
