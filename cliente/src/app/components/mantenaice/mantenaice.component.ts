import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import {DataService} from '../../servicios/data.service';

@Component({
  selector: 'app-mantenaice',
  templateUrl: './mantenaice.component.html',
  styleUrls: ['./mantenaice.component.css']
})
export class MantenaiceComponent implements OnInit {

  constructor(private dataExterna:DataService,
               private http:HttpClient) { }

  ngOnInit() {
  }
  exportaMasivo(){
    console.log('exportación masiva');
    //this.http.get('')
  }

}
