import { Component, OnInit } from '@angular/core';
import { StarshipsService } from '../../services/starships.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starships-list.component.html',
  styleUrl: './starships-list.component.sass'
})


export class StarshipsListComponent implements OnInit {

  starShips: any[] = [];

  constructor(private starshipsService: StarshipsService) { }

  ngOnInit(): void {
    this.starshipsService.getStarships().subscribe(data => {
      this.starShips = data.results;
      //console.log(this.starShips)
    });
  }

}
