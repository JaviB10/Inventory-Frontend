import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component.js';
import { HomeComponent } from './components/home/home.component.js';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardComponent,
    HomeComponent,
    RouterModule
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
