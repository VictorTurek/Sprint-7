
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.sass'
})


export class charactersListComponent implements OnInit {

  characters: any[] = [];
  selectedCharacterIndex: number | null = null;
  imageUrl: string | null = null;
  imageNotFoundUrl: string = "assets/images/ImageNotFound.jpg";
  currentPage: number = 1;
  loading: boolean = false; // Variable para rastrear si se está cargando una página


  constructor(private CharactersService: CharactersService, private router: Router) { }

  @Output() componentSelected = new EventEmitter<string>();


  ngOnInit(): void {
    this.getcharacters(this.currentPage);
  }

  // selectcharacter(index: number) {   // Método para seleccionar el character en función de su índice
  //   this.selectedCharacterIndex = index;
  // }

  selectcharacter(index: number) {
    if (this.selectedCharacterIndex === index) {
      this.selectedCharacterIndex = null; // Si ya está seleccionado, deseleccionarlo
    } else {
      this.selectedCharacterIndex = index; // Si no está seleccionado, seleccionarlo
    }
  }

  loadcharacterComponent(character: any) {
    //console.log("character", character)
    this.extraerUrlId(character.url)
    //console.log("character.pilots", character.pilots.length)
  }

  positionInto(i: number) {
    //console.log("character position", i)
  }

  extraerUrlId(url: string) {
    const regex = /\/(\d+)\/$/;     // Verificar si la URL es válida y contiene un numero en ella
    const match = url.match(regex);
    if (match && match[1]) {     // Si hay una coincidencia y se captura un número
      this.imageUrl = this.generateImageUrl(match[1]);
    }
  }

  generateImageUrl(id: string): string { //esta funcion genera la url para buscar la magen de las naves.
    return "https://starwars-visualguide.com/assets/img/characters/" + id + ".jpg";
  }

  handleImageError() {
    this.imageUrl = this.imageNotFoundUrl; // Cargar la imagen de reemplazo en caso de error
  }

  handleImageError2(event: any) {
    event.target.style.display = 'none';
  }

  getcharacters(currentPage: number): void {
    // Verificar si ya se está cargando una página antes de hacer otra solicitud
    if (!this.loading) {
      this.loading = true; // Establecer la bandera de carga en verdadero
      this.CharactersService.getcharactersService(currentPage).subscribe(
        (data) => {
          // Concatenar los nuevos datos con los existentes
          this.characters = this.characters.concat(data.results);
          this.loading = false; // Establecer la bandera de carga en falso después de que se complete la solicitud
        },
        (error) => {
          //console.error('Error loading characters:', error);
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
      this.getcharacters(this.currentPage);
    }
  }

  extractNumber(url: any): string {
    console.log("url", url)
    let URL: string = url.url
    
    // Eliminar el segmento inicial "https://swapi.dev/api/"
    let peopleToCharacter = URL.replace('https://swapi.dev/api/people', 'https://swapi.dev/api/characters')
    const path = peopleToCharacter.replace('https://swapi.dev/api/', '');
    const finalPath = path.endsWith('/') ? path.slice(0, -1) : path;
    console.log(finalPath)
    return finalPath;
  }

  extractNumber2(url: string): string {
    console.log("url", url)
  
    // Eliminar el segmento inicial "https://swapi.dev/api/"
    let peopleToCharacter = url.replace('https://swapi.dev/api/people', 'https://swapi.dev/api/characters')
    const path = peopleToCharacter.replace('https://swapi.dev/api/', '');
    const finalPath = path.endsWith('/') ? path.slice(0, -1) : path;
    console.log(finalPath)
    return finalPath;
  }
  

}