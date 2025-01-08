import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { HomeComponent } from './modules/dashboard/components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirección al dashboard
    { path: 'dashboard', component: DashboardComponent }, // Ruta para el dashboard
    { path: 'home', component: HomeComponent }, // Ruta para home
];
