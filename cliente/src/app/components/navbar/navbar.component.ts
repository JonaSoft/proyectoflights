import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router,) { 
    let seleccionaFotter = document.getElementById('team');
  }

  ngOnInit() {
  }
  irFooter(){
    document.getElementById("team").scrollIntoView({ behavior: "smooth" });
  }

}
