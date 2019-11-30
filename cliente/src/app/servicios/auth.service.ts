import { Injectable } from '@angular/core';
//import { AngularFireModule } from '@angular/fire';
import { HttpClient } from '@angular/common/http';
//import { AngularFireAuth } from '@angular/fire/auth';
//import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuario: any={};
  private url='https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey='AIzaSyDW6WxVH-l3ZWogVOGgzKd5U7nBOTy3UH4';
  constructor(
      //public afAuth: AngularFireAuth
      private http:HttpClient
   ) { }
   /*registerUser(email: string, pass:string){
      return new Promise((resolve,reject) => {
         this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
         .then( userData => resolve(userData),
          err => reject (err));
      });
   }
   //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
   loginAuth(email: string, pass:string){
      return new Promise((resolve,reject) => {
         this.afAuth.auth.signInWithEmailAndPassword(email,pass)
         .then( userData => {resolve(userData);
                             //console.log(userData.user.email)
                            },
          err => reject (err));
      });
   }
   



   logoutAuth(){
      return this.afAuth.auth.signOut();
   }*/
   login( usuario:any){
      const authData ={
         ...usuario,
         returnSecureToken: true
      };
      return this.http.post(
         `${ this.url }signInWithPassword?key=${ this.apiKey }`,
         authData 
      );

   }
}
