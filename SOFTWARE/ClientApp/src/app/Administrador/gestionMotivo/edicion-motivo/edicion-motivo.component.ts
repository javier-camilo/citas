import { Component, OnInit } from '@angular/core';
import { Motivo } from 'src/app/Modelo/motivo';

@Component({
  selector: 'app-edicion-motivo',
  templateUrl: './edicion-motivo.component.html',
  styleUrls: ['./edicion-motivo.component.css']
})
export class EdicionMotivoComponent implements OnInit {

  
  motivo:Motivo;

  constructor() { }

  ngOnInit(): void {
    this.motivo=new Motivo();
  }

}
