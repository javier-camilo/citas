import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/servicios/turno.service';
import { Turno } from '../../Modelo/turno';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { Register, UserVista } from 'src/app/Modelo/register';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-registrar-atencion',
  templateUrl: './registrar-atencion.component.html',
  styleUrls: ['./registrar-atencion.component.css']
})
export class RegistrarAtencionComponent implements OnInit {


  datosContratista: Register;
  datosUsuario: UserVista;
  turno: Turno;

  constructor(private rutaActiva: ActivatedRoute, private turnoServicio: TurnoService,
    private dialog: MatDialog, private loginService:LoginService) { }

  ngOnInit(): void {
    this.inicializarContratista();
    this.consultarTurno();
  }

  inicializarContratista() {
    this.datosContratista = new Register();
    this.datosContratista = this.loginService.GetInformacionUsuario();
  }



  consultarTurno() {

    this.turno = new Turno();

    const id = this.rutaActiva.snapshot.params.codigoTurno;

    this.turnoServicio.getId(id).subscribe(resul => {

      this.turno=resul;

      this.turno != null ? this.incializarUsario() : this.inicializarError();

    });

  }


  incializarUsario() {

    this.datosUsuario = new UserVista();

    this.loginService.getUserID(this.turno.refSolicitante).subscribe(resul => {

      this.datosUsuario=resul;

      this.datosUsuario != null ? null : this.errorUsuario();

    });

  }


  inicializarError() {

    this.dialog.open(DialogoConfirmacionComponent, { data: { name: "Señor(a) usuario(a)", descripcion: "hubo un error al consultar el turno", EsMensaje: "true" } });
    this.turno = new Turno();
    this.turno.asistencia = " ";
    this.turno.contratistaAtendio = " ";
    this.turno.descripcionOperacion = " ";
    this.turno.fechaFinalizacion = " ";
    this.turno.motivo = " ";
    this.turno.numero = 0;
    this.turno.observacion = " ";
    this.turno.poblacion = " ";
    this.turno.refSolicitante = " ";
    this.turno.refTiempo = " ";

  }

  errorUsuario() {
    this.dialog.open(DialogoConfirmacionComponent, { data: { name: "Señor(a) usuario(a)", descripcion: "hubo un error al consultar el usuario", EsMensaje: "true" } });
    this.datosUsuario = new UserVista();
  }



}
