import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
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
  imageNotFoundUrl: string = "assets/images/ImageNotFound.jpg";
  currentPage: number = 1;
  loading: boolean = false; // Variable para rastrear si se está cargando una página


  constructor(private starshipsService: StarshipsService, private router: Router) { }

  @Output() componentSelected = new EventEmitter<string>();


  ngOnInit(): void {
    this.getStarships(this.currentPage);
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
    console.log("this.imageUrl ", this.imageUrl)
  }

  generateImageUrl(id: string): string { //esta funcion genera la url para buscar la magen de las naves.
    return "https://starwars-visualguide.com/assets/img/starships/" + id + ".jpg";
  }

  handleImageError() {
    this.imageUrl = this.imageNotFoundUrl; // Cargar la imagen de reemplazo en caso de error
  }

  getStarships(currentPage: number): void {
    // Verificar si ya se está cargando una página antes de hacer otra solicitud
    if (!this.loading) {
      this.loading = true; // Establecer la bandera de carga en verdadero
      this.starshipsService.getStarshipsService(currentPage).subscribe(
        (data) => {
          // Concatenar los nuevos datos con los existentes
          this.starShips = this.starShips.concat(data.results);
          this.loading = false; // Establecer la bandera de carga en falso después de que se complete la solicitud
        },
        (error) => {
          console.error('Error loading starships:', error);
          this.loading = false; // Establecer la bandera de carga en falso en caso de error
        }
      );
    }
  }

  @HostListener('window:scroll', ['$event'])   // Método para manejar el evento de scroll
  onScroll(event: any): void {
    // Verificar si el usuario ha llegado al final de la página y no está cargando actualmente una página
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.loading) {
      // Incrementar el contador de página y obtener más datos
      this.currentPage++;
      this.getStarships(this.currentPage);
    }
  }
}
