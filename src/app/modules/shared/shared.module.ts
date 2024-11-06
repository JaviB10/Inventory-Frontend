import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SidenavComponent
  ],
  exports: [
  SidenavComponent,
  ]
})
export class SharedModule { }
