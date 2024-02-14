import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StarshipsService } from './services/starships.service';
import { LoginComponent } from './components/login/login.component'; // Asegúrate de importar el componente de login desde la ubicación correcta


export const routes: Routes = [
    //{path: '', component: HomeComponent},
    //{path: 'starships', component: StarshipsService}, //routing for the header links. I use :type do define which kind of content we show.
    { path: 'login', component: LoginComponent }, // Asegúrate de que 'login' sea la ruta correcta para tu componente de login y de que el componente esté importado correctamente

];
