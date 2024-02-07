import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.sass'
})
export class CharactersListComponent implements OnInit {

  characters: any[] = [];

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.charactersService.getCharacters().subscribe(data => {
      this.characters = data.results;
      console.log(this.characters)
    });
  }

}


