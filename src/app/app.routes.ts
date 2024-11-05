import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component.js';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', component: DashboardComponent },
];