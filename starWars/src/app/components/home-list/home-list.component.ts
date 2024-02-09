import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home-list',
  standalone: true,
  imports: [RouterLinkActive],
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.sass'
})
export class HomeListComponent {

  @Output() componentSelected = new EventEmitter<string>();

  constructor() { }

  selectComponent(component: string) {
    this.componentSelected.emit(component);
    //console.log("click", component)
  }
}
