import { Injectable } from '@angular/core';
//import { AngularFireModule } from '@angular/fire';
import { HttpClient } from '@angular/common/http';
import { usuarioModel} from '../models/usuario.model'
//import { AngularFireAuth } from '@angular/fire/auth';
//import * as firebase from 'firebase/app';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuario: any={};
  private url='https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey='AIzaSyDW6WxVH-l3ZWogVOGgzKd5U7nBOTy3UH4';
  userToken:string;
  constructor(
      //public afAuth: AngularFireAuth
      private http:HttpClient
   ){
      this.leerToken()
    }
   logout(){
         localStorage.removeItem('token')
   }

   login( usuario:any){
      const authData ={
         ...usuario,
         returnSecureToken: true
      };
      return this.http.post(
         `${ this.url }signInWithPassword?key=${ this.apiKey }`,
         authData 
      ).pipe(
         map(res => {
            console.log('entro en el map del RXJS');
            this.guardarToken(res['idToken']);
            return res;
         })

      )
   }
   private guardarToken(idToken:string){
         this.userToken = idToken;
         localStorage.setItem('token',idToken);
   }

   //LEER TOKEN DEL LOCALSTORAGE
   leerToken(){
      if ( localStorage.getItem('token')){
            this.userToken = localStorage.getItem('token');
      } else {
            this.userToken = "";
      }
   }
   //PREGUNTAR SI ESTA AUTENTICADO
   estaAutenticado(): boolean {
      return this.userToken.length > 10
   }
}
