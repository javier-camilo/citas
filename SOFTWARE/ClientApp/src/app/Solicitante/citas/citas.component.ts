import { OnInit } from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import { MotivoService } from '../../servicios/motivo.service';
import { LoginService } from '../../servicios/login.service';
import { PoblacionServiceService } from '../../servicios/poblacion-service.service';
import { Motivo } from 'src/app/Modelo/motivo';
import { Poblacion } from 'src/app/Modelo/poblacion';
import { Register } from '../../Modelo/register';
import { TurnoService } from 'src/app/servicios/turno.service';
import { Turno } from 'src/app/Modelo/turno';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  protected motivos: Motivo[];
  protected poblaciones: Poblacion[];
  protected usuario: Register;
  protected turno: Turno;

  desripcionMotivo:string | null;

  constructor(public dialogo: MatDialog, private _formBuilder: FormBuilder,
    private motivoService: MotivoService, private loginservice: LoginService,
    private poblacionService:PoblacionServiceService, private turnoService: TurnoService ) { }

  ngOnInit(): void {
    this.caragandoDatos();
  }

  caragandoDatos() {
    this.turno = new Turno();
    this.desripcionMotivo = "";
    this.motivos = [];
    this.poblaciones = [];
    this.usuario = this.loginservice.GetInformacionUsuario();
    this.motivoService.get("").subscribe(result => this.motivos = result);
    this.poblacionService.get("").subscribe(result=>this.poblaciones=result);

  }

  cargarDescripcion(descripcion: string) {
    this.desripcionMotivo = descripcion;
  }

  firstFormGroup = this._formBuilder.group({
    motivo: ['', Validators.required],
    poblacion: ['', Validators.required]
  });


  registrar() {
    let dialogo= this.dialogo.open(DialogoConfirmacionComponent, {data:{name:"Advertencia", descripcion:"¿esta seguro de realizar esta accion?"} } );

    dialogo.afterClosed().subscribe(result => {
      if (result) {
        this.cargarDatos();
        this.turnoService.post(this.turno).subscribe();
      }
    });
  }

  cargarDatos() {
    this.turno.fechaFinalizacion = "";
    this.turno.descripcionOperacion = this.desripcionMotivo;
    this.turno.contratistaAtendio = "";
    this.turno.refTiempo = "";
    this.turno.asistencia = "";
    this.turno.observacion= "";
    this.turno.motivo = this.firstFormGroup.controls["motivo"].value;
    this.turno.poblacion = this.firstFormGroup.controls["poblacion"].value;
    this.turno.refSolicitante = this.usuario.identificacion;
  }

  isLinear = true;

}
