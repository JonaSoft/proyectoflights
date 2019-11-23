import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  
  URL_PAIS = 'http://localhost:3000/flights/paises';

  constructor(private httpPais:HttpClient) { 

  }
  mostrarDataPaises(){
    return this.httpPais.get(this.URL_PAIS)
  }

}
