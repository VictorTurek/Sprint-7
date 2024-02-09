import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StarshipsService } from '../../services/starships.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starships-list.component.html',
  styleUrl: './starships-list.component.sass'
})


export class StarshipsListComponent implements OnInit {

  starShips: any[] = [];
  selectedStarshipIndex: number | null = null;
  imageUrl: string | null = null;


  constructor(private starshipsService: StarshipsService, private router: Router) { }

  @Output() componentSelected = new EventEmitter<string>();


  ngOnInit(): void {
    this.starshipsService.getStarships().subscribe(data => {
      this.starShips = data.results;
      console.log(this.starShips)
    });
  }

  selectStarship(index: number) {   // Método para seleccionar el starship en función de su índice
    this.selectedStarshipIndex = index;
  }

  loadStarshipComponent(starShip: any) {
    console.log("starship", starShip)
    //this.componentSelected.emit(starShip.name);
    this.extraerUrlId(starShip.url)
    console.log("starShip.pilots", starShip.pilots.length)

  }


  positionInto(i: number) {
    console.log("starship position", i)
  }

  extraerUrlId(url: string) {
    const regex = /\/(\d+)\/$/;     // Verificar si la URL es válida y contiene un numero en ella
    const match = url.match(regex);
    if (match && match[1]) {     // Si hay una coincidencia y se captura un número
      this.imageUrl = this.generateImageUrl(match[1]);
    }
    console.log("this.imageUrl ", this.imageUrl )
  }

  generateImageUrl(id: string): string { //esta funcion genera la url para buscar la magen de las naves.
    return "https://starwars-visualguide.com/assets/img/starships/" + id + ".jpg";
  }



}
