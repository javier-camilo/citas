import { Component, OnInit } from '@angular/core';
import { Poblacion } from 'src/app/Modelo/poblacion';
import { PoblacionServiceService } from 'src/app/servicios/poblacion-service.service';

@Component({
  selector: 'app-consultar-poblacion',
  templateUrl: './consultar-poblacion.component.html',
  styleUrls: ['./consultar-poblacion.component.css']
})
export class ConsultarPoblacionComponent implements OnInit {

  searchText:string;
  poblacion:Poblacion[];
  loading:boolean;
  displayedColumns: string[] = ['nombre', 'prioridad', 'editar/eliminar'];

  constructor(private poblacionService:PoblacionServiceService) { }

  ngOnInit(): void {
      
    this.searchText="";
    this.loading=true;
    this.poblacionService.get("poblacionComponent").subscribe(result=>{this.poblacion=result; this.loading=false;}
      );
  }

}
