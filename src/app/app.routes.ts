import { Routes } from '@angular/router';
import { HomeComponent } from './modules/dashboard/components/home/home.component';
import { SidenavComponent } from './modules/shared/components/sidenav/sidenav.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirección al dashboard
    {
        path: 'dashboard',
        component: SidenavComponent, // Sidenav como contenedor
        children: [
          { path: '', component: HomeComponent }, // Componente predeterminado (HomeComponent)
        ],
    },
];
