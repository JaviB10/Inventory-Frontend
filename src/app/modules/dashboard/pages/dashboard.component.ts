import { Component } from '@angular/core';
import { HomeComponent } from '../components/home/home.component.js';
import { SidenavComponent } from "../../shared/components/sidenav/sidenav.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HomeComponent, SidenavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
