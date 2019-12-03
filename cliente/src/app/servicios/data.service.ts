import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Flights } from '../models/flights';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  selectedFlight:Flights;
  flights:Flights[];
  market:any;
  flightini:any;
  codope:any;
  flightope:any;
  origen:any;
  destino:any;
  fechainit:any;
  cliente:any;
  peticion:any;


  URL_API = 'http://localhost:3000/flights';
 
  constructor(private http:HttpClient) {
    this.selectedFlight = new Flights()
   }
  getFlights(flightini:any){
    return this.http.get(this.URL_API +`?${flightini}`)    
  }
  
  postFlight(flight:Flights){
    return this.http.post(this.URL_API,flight)
  }
  
  putFlight(flight:Flights){
    //return this.http.put(this.URL_API + `/${flight._id}`,flight);
  }

  deleteFlight(_id:String){
    return this.http.delete(this.URL_API + `/${_id}`)
  }
  //solicita data desde el formulario
  mostrarDataForm(market:any,flightini:any,codope:any,flightope:any,origen:any,destino:any,fechainit:any){
    // PETICION POR FECHA DE REGISTRO
    if(market == "" && flightini=="" && codope=="" && flightope=="" && origen=="" && destino=="" ){
      return this.http.get(this.URL_API +`?fechareg=${fechainit}`) 
    }
    //PETICION POR SOLO MARKET
    if(flightini=="" && codope=="" && flightope=="" && origen=="" && destino=="" && fechainit==""){
      return this.http.get(this.URL_API +`?market=${market}`) 
    }
     //PETICION POR OPERADOR
     if( market=="" && flightini=="" && flightope=="" && origen=="" && destino=="" && fechainit==""){
      return this.http.get(this.URL_API +`?codope=${codope}`)  
    }
    //SOLO FLIGHTINI
    if( market=="" && codope=="" && flightope=="" && origen=="" && destino=="" && fechainit==""){
      return this.http.get(this.URL_API +`?flightini=${flightini}`)  
    }
    //NONE
    if(market=="" && flightini=="" && codope=="" && flightope=="" && origen=="" && destino=="" && fechainit==""){
      return this.http.get(this.URL_API +`?none`) 
    }
    //PETICION POR MARKETERO Y FLIGHTINI
    if(codope=="" && flightope=="" && origen=="" && destino=="" && fechainit==""){
      return this.http.get(this.URL_API +`?market=${market}&flightini=${flightini}`)  
    }
    //PETICION POR CODOPERATOR FLIGHTOPERATOR
    if(market=="" && flightini=="" && origen=="" && destino=="" && fechainit==""){
      return this.http.get(this.URL_API +`?codope=${codope}&flightope=${flightope}`)  
    }
    //PETICION POR ORIGEN Y DESTINO
    if(market=="" && flightini=="" && codope=="" && flightope=="" && fechainit==""){
      return this.http.get(this.URL_API +`?origin=${origen}&destinat=${destino}`)  
    }
    //PETICION POR MARKETERO Y OPERADOR
    if( flightini=="" && flightope=="" && origen=="" && destino=="" && fechainit==""){
      return this.http.get(this.URL_API +`?market=${market}&codope=${codope}`)  
    }
   
  }
  mostrarFlight(cliente:any){
      console.log(cliente);

      this.http.get(this.URL_API +`/img/${cliente}`)
      
     //return cliente.img
  }

}
