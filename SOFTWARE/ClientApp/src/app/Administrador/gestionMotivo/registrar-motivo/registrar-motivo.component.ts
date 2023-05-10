import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Motivo } from 'src/app/Modelo/motivo';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { MotivoService } from 'src/app/servicios/motivo.service';

@Component({
  selector: 'app-registrar-motivo',
  templateUrl: './registrar-motivo.component.html',
  styleUrls: ['./registrar-motivo.component.css']
})
export class RegistrarMotivoComponent implements OnInit {


  motivo:Motivo;
  respuesta:string;

  constructor(private motivoService:MotivoService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.motivo= new Motivo();
  }

  guardar(): void{
    
    this.motivoService.post(this.motivo).subscribe();

  }


}
