import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { StarshipsListComponent } from './components/starships-list/starships-list.component';
import { charactersListComponent } from './components/characters-list/characters-list.component';
import { HomeListComponent } from './components/home-list/home-list.component';
import { RouterLinkActive } from '@angular/router';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MenuComponent, CommonModule, StarshipsListComponent, charactersListComponent, HomeListComponent, RouterLinkActive, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'starWars';

  currentComponent: string = '/';

  constructor() { }

  showComponent(component: string) {
    console.log("component" , component)
    this.currentComponent = component;
    //console.log("currentComponent" , this.currentComponent)

  }
}
