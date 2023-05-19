import { Component, OnInit } from '@angular/core';
import { Solicitante } from 'src/app/Modelo/solicitante';
import { SolicitanteService } from 'src/app/servicios/solicitante.service';

@Component({
  selector: 'app-consulta-solicitante',
  templateUrl: './consulta-solicitante.component.html',
  styleUrls: ['./consulta-solicitante.component.css']
})
export class ConsultaSolicitanteComponent implements OnInit {

  searchText:string;
  solicitantes:Solicitante[];
  loading:boolean;

  constructor(private solicitanteService:SolicitanteService) { }

  ngOnInit(): void {
    
    this.searchText="";
    this.loading=true;
    this.solicitanteService.get("solicitanteComponent").subscribe(result=>{this.solicitantes=result; this.loading=false;}
      );

  }

}
