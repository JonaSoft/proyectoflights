import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../servicios/auth.service'
import { NgForm } from '@angular/forms';
import { usuarioModel} from '../../models/usuario.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:usuarioModel;
  alerta=false;
  constructor(
  private router: Router,
  public _auth: AuthService
   ) { }

  ngOnInit() {
     this.usuario = new usuarioModel();
     this.usuario.email='IngresaEmailAutorizado@asi.com';
     this.usuario.password='***********'
  }
   //login(){
   //     this.router.navigate(['/home'])
   //}
   //logout(){
   //        this.router.navigate(['/notfound'])
   //}
   login(form:NgForm){
      if(form.invalid){
         console.log('form no valido');
         this.alerta=true;
         return
      }
      console.log(this.usuario)
      console.log(form)
      /*this._auth.loginAuth(this.email,this.password)
      .then((res)=>{
            //console.log(this.email);
            console.log(res);
            //console.log(this.password);
            this.router.navigate(['/home']);
      }).catch((err)=>{
         console.log(err);
         this.alerta=true;
      })*/

   }
   
}
