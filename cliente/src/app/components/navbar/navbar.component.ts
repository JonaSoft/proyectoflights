import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router,
               private afAuth: AuthService
              ) { }

  ngOnInit() {
  }
  
  logout(){
    this.afAuth.logout();
    this.router.navigateByUrl('/login')
  }

}
