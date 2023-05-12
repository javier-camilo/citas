import { Component, OnInit } from '@angular/core';
import { Motivo } from 'src/app/Modelo/motivo';
import { MotivoService } from 'src/app/servicios/motivo.service';

@Component({
  selector: 'app-consultar-motivo',
  templateUrl: './consultar-motivo.component.html',
  styleUrls: ['./consultar-motivo.component.css']
})
export class ConsultarMotivoComponent implements OnInit {


  searchText:string;
  motivos:Motivo[];
  loading:boolean;
  displayedColumns: string[] = ['nombre', 'descripcion', 'editar/eliminar'];

  constructor(private motivoService:MotivoService) { }

  ngOnInit(): void {

    
    this.searchText="";
    this.loading=true;
    this.motivoService.get("motivoComponent").subscribe(result=>{this.motivos=result; this.loading=false;}
      );

  }

}
