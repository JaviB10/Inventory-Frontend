import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: "Home", route: "home", icon: "home" },
    {name: "Categories", route: "categories", icon: "category" },
    {name: "Products", route: "product", icon: "production_quantity_limits" },
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
      
  }
}
