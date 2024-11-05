import { Component } from '@angular/core';
import { HomeComponent } from '../components/home/home.component.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
