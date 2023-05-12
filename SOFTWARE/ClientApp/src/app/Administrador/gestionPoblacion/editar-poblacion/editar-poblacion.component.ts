import { Component, OnInit } from '@angular/core';
import { Poblacion } from 'src/app/Modelo/poblacion';

@Component({
  selector: 'app-editar-poblacion',
  templateUrl: './editar-poblacion.component.html',
  styleUrls: ['./editar-poblacion.component.css']
})
export class EditarPoblacionComponent implements OnInit {

  poblacion:Poblacion;

  constructor() { }

  ngOnInit(): void {
    this.poblacion=new Poblacion();
  }

}
