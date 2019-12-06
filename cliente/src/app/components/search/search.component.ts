import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Flights } from '../../models/flights';
import { ExporterService } from '../../servicios/enviarhacia.service';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
//import { RouteConfigLoadStart } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  forma:FormGroup;
  _flightini:number;
  _market:string;
  _codope:string;
  _flightope:number;
  _origen:string;
  _destino:string;
  _fechainit:any;
  _fechareg:any;
  loading:boolean=false;
  mostrar:boolean=false;
  aviso:boolean=false;
  view:boolean=true;
  hide:boolean=false;
  data:Flights[]=[];
  


  constructor(private dataService:DataService,
              private aExcel: ExporterService,
              private auth: AuthService,
              private router: Router) {
    
    this.forma = new FormGroup({
      'market':new FormControl(''),
      'flightini':new FormControl(''),
      'codope':new FormControl(''),
      'flightope':new FormControl(''),
      'origen':new FormControl(''),
      'destino':new FormControl(''),
      'fechainit': new FormControl('')
   })
  
   }
  ngOnInit() {
    console.log('ingresa a validacion')
    this.auth.leerToken()
    if(this.auth.estaAutenticado()){
      console.log('pasó el true')
      return true
    } else {
      this.router.navigateByUrl('/login')
      console.log('pasó el false')
      return false

    }
  }
 public clientes = [];
  getFlights() {
    this.data=[];
    /*this.dataService.getFlights()
        .subscribe(res => {
        for(let i in res['flights']){
          this.data.push(res['flights'][i]);
        }
        console.log(this.data)
      });*/
    
  }
  enviarForm(){
    console.log(this.forma.value);
    this.data=[];
    /*this.dataService.getFlights()
        .subscribe(res => {
        for(let i in res['flights']){
          this.data.push(res['flights'][i]);
        }
        console.log(this.data)
      });*/
      
    this._flightini = this.forma.value.flightini;
    this._market = this.forma.value.market.toUpperCase();
    this._codope = this.forma.value.codope.toUpperCase();
    this._flightope= this.forma.value.flightope;
    this._origen = this.forma.value.origen.toUpperCase();
    this._destino = this.forma.value.destino.toUpperCase();
    this._fechareg = this.forma.value.fechainit;
    this._fechareg = this.forma.value.fechainit.split('-').reverse().join('/');

    console.log(this._fechareg)
    this.view=false;
    this.hide=true;
    this.loading = true;
    //console.log(this.datos)
    this.dataService.mostrarDataForm(this._market,this._flightini,this._codope,this._flightope,this._origen,this._destino,this._fechareg)
    .subscribe(res => {
      for(let i in res['flights']){
        this.data.push(res['flights'][i]);
      }
      this.data=this.data.sort((prev,next)=>{
        return prev.flightini-next.flightini;
      });
      console.log(this.data)
      //this.data= this.clientes
      this.loading=false;
      if (this.data.length>0){

        this.mostrar=true;
        this.aviso=false

      }else{
        this.mostrar=false;
        this.aviso=true
      }
    })
  }
  seeFlight (cliente:any){
    console.log(cliente);
    this.dataService.mostrarFlight(cliente)
    window.open(`http://localhost:3000/flights/img/${cliente}`, "","directories=yes, location=yes, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=950, height=650"); 
    return
  }
  buscaWeb(clientes:any){
    console.log(clientes);
    window.open(`https://es.aviability.com/numero-de-vuelo/vuelo-${clientes.market}${clientes.flightini}-?`, "","directories=yes, location=yes, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=950, height=650"); 
      return
  }
  closeTable(forma:NgForm){
    this.hide = false;
    this.view = true;
    this.mostrar = false;
    this.aviso = false;
    this._market = "";
    this._flightini=0;
    this._codope="";
    this._flightope=0;
    this._origen="";
    this._destino="";
    this.forma.reset({
         market:"",
         flightini:"",
         codope:"",
         flightope:"",
         origen:"",
         destino:"",
         fechainit:""
       }
    )
 }
 
 addFlights() {
  /*if(form.value._id) {
    this.updateFlight(form);
  } else {
  this.dataService.postFlight(form.value)
    .subscribe(res => {
      this.getFlights();
      //this.resetForm(form);
      //M.toast({html: 'Save Successfully'});
    });
  }*/
  //this.dataService.postFlight(data)
  //console.log(data,'insertado')
 }
 updateFlight(form){
  this.dataService.putFlight(form.value)
      //.subscribe(res => {
        //this.resetForm(form);
       // this.getFlights();
        //M.toast({html: 'Updated Successfully'});
      //});
}
enviarPrinter(){
  console.log("window.print");
  window.print()
}
crearExcel():void{
  console.log("a excel");

 this.aExcel.exportarExcel(this.data,'descarga excel')
}
}
