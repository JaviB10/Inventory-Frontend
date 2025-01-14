import { Routes } from '@angular/router';
import { HomeComponent } from './modules/dashboard/components/home/home.component';
import { SidenavComponent } from './modules/shared/components/sidenav/sidenav.component';
import { CategoryComponent } from './modules/category/components/category/category.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirección al dashboard
    {
        path: 'dashboard',
        component: SidenavComponent, // Sidenav como contenedor
        children: [
          { path: 'home', component: HomeComponent }, // Componente predeterminado (HomeComponent)
          { path: 'category', component: CategoryComponent }, // Componente predeterminado (CategoryComponent)
        ],
    },
];
