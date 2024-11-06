import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component.js';
import { HomeComponent } from './components/home/home.component.js';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module.js';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardComponent,
    HomeComponent,
    RouterModule,
    SharedModule
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
