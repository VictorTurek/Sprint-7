import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass'
})
export class MenuComponent {
  @Output() componentSelected = new EventEmitter<string>();

  constructor() { }

  selectComponent(component: string) {
    this.componentSelected.emit(component);
  }
}
