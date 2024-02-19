import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; // Asegúrate de importar el componente de login desde la ubicación correcta
import { StarshipsListComponent } from './components/starships-list/starships-list.component';
import { charactersListComponent } from './components/characters-list/characters-list.component';
import { HomeListComponent } from './components/home-list/home-list.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
    {
        path: '',
        component: HomeListComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }, // Asegúrate de que 'login' sea la ruta correcta para tu componente de login y de que el componente esté importado correctamente
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'starships-list',
        component: StarshipsListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'characters-list',
        component: charactersListComponent
    },

];
