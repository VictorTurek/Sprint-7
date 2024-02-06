import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StarshipsService } from './services/starships.service';

export const routes: Routes = [
    //{path: '', component: HomeComponent},
    {path: 'starships', component: StarshipsService}, //routing for the header links. I use :type do define which kind of content we show.
];
