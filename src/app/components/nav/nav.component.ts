import { Component, OnInit } from '@angular/core';
import { NavbarMenu } from 'src/app/models/ViewModels/navbarMenu';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navbarMenus: NavbarMenu[] = [
    { menu: "Cars",path:["cars",""], active: true },
    { menu: "Brands",path:["brands"], active: false },
    { menu: "Colors",path:["colors"], active: false },
    { menu: "Customers",path:["customers"], active: false },
    { menu: "Rentals", path:["rentals"],active: false },
  ];
  constructor(private router:Router) { }

  ngOnInit(): void {
    let url = window.location.pathname;
    url = url.substring(1,url.length);
    this.navbarMenus.forEach(element => {
      if (element.path.includes(url)) {
        element.active = true;
      }
      else{
        element.active = false;
      }
    });
  }


}
