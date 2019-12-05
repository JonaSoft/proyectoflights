import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../servicios/paises.service'

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {
  public byciudades:boolean = false;
  public bypaises:boolean = true;
  public linkregresar:boolean =false;
  public verinput:boolean = true;
  constructor(private paises:PaisesService,
              private ciudades:PaisesService) { }
  public data = [];
  public dataciudades = [];
  public datafinal = [];
  public valor=" ";

  ngOnInit() {
    //this.data=[]
    this.paises.mostrarDataPaises()
    .subscribe(res=>{
      for(let i in res['paises']){
        this.data.push(res['paises'][i])
      }
      console.log(this.data)
    })
  }

  searchCiudades(event:any):void{
    this.valor = event.target.value;
    this.valor = this.valor.toUpperCase();
    this.ciudades.mostrarDataCiudades(this.valor)
    .subscribe(res=>{
      for(let i in res['ciudades']){
        if (this.valor == res['ciudades'][i].codeciudad){
          this.dataciudades.push(res['ciudades'][i]);
          this.searchPaises(res['ciudades'][i].codepais)
        }
      }
      //console.log(this.dataciudades);
      this.bypaises=false;
      this.byciudades=true;
      this.verinput= false
    })
   
  }
  searchPaises(valor:any){

    this.paises.mostrarDataPaises()
    .subscribe(res=>{
      for(let i in res['paises']){
        if (valor == res['paises'][i].alpha2Code){
          this.dataciudades.push(res['paises'][i])
        }
        //this.data.push(res['paises'][i])
      }
      console.log(this.dataciudades)
      this.datafinal.push({
        codeciudad: this.dataciudades[0].codeciudad,
        nombreciudad: this.dataciudades[0].nombreciudad,
        codepais: this.dataciudades[0].codepais,
        namepais: this.dataciudades[1].name,
        capitalpais: this.dataciudades[1].capital,
        region: this.dataciudades[1].region,
        subregion: this.dataciudades[1].subregion,
        timezones: this.dataciudades[1].timezones[0],
        fronteras: this.dataciudades[1].borders,
        callingcodes: this.dataciudades[1].callingCodes[0],
        numericodepais: this.dataciudades[1].numericCode,
        flag: this.dataciudades[1].flag,
        regionalacron: this.dataciudades[1].regionalBlocs[0].acronym,
        regionalname: this.dataciudades[1].regionalBlocs[0].name,
        lat: this.dataciudades[1].latlng[0],
        lon: this.dataciudades[1].latlng[1]


      })
      console.log(this.datafinal)
      this.linkregresar=true
    })
  }
  regresar(){
    this.byciudades=false;
    this.bypaises=true;
    this.linkregresar=false;
    this.verinput= true;
    this.datafinal = [];
    this.dataciudades = []
  }
  
}
