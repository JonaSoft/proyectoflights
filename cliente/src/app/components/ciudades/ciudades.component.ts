import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../servicios/paises.service'

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  constructor(private paises:PaisesService) { }
  private data = [];
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
  
}
