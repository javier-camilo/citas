import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Motivo } from 'src/app/Modelo/motivo';
import { Poblacion } from 'src/app/Modelo/poblacion';
import { Register, UserVista } from 'src/app/Modelo/register';
import { LoginService } from 'src/app/servicios/login.service';
import { MotivoService } from 'src/app/servicios/motivo.service';
import { PoblacionServiceService } from 'src/app/servicios/poblacion-service.service';
import { Turno } from '../../Modelo/turno';
import { MatDialog } from '@angular/material/dialog';
import { HandleHttpErrorService } from 'src/app/@base/handle-http-error-service.service';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-citas-ventanilla',
  templateUrl: './citas-ventanilla.component.html',
  styleUrls: ['./citas-ventanilla.component.css']
})
export class CitasVentanillaComponent implements OnInit {


  protected usuario: UserVista;
  protected turno: Turno;
  protected motivos: Motivo[];
  protected poblaciones: Poblacion[];
  protected descripcionMotivo: string;


  protected isLinear = true;
  protected encontrado: boolean;
  protected hide = true;

  firstFormGroup = this._formBuilder.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    identificacion: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    motivo: ['', Validators.required],
    poblacion: ['', Validators.required]
  });


  constructor(private loginservice: LoginService, private _formBuilder: FormBuilder, private motivoService: MotivoService,
    private poblacionService: PoblacionServiceService,private dialog:MatDialog, private error:HandleHttpErrorService) { }

  ngOnInit(): void {

    this.cargarDatos();
    //this.firstFormGroup.get('userName')?.patchValue("nuevo");

  }


  confirmar(){


    if (this.firstFormGroup.invalid)
      return this.error.log("debe verificar los campos");

    let dialogo = this.dialog.open(DialogoConfirmacionComponent, { data: { name: "Advertencia", descripcion: "¿esta seguro de realizar esta accion?" } });

    dialogo.afterClosed().subscribe(result => {
      if (result) {
        if (this.encontrado == false) {
          this.guardarTurnoUsuario();
        } else {
          this.guardarTurno();
        }
      }
    }
    );

  }


  guardarTurno() {

    console.log("turno guardado");

  }


  guardarTurnoUsuario() {

    console.log("usuario guardado");

  }


  cargarDatos() {
    this.usuario = new UserVista();
    this.turno = new Turno();
    this.encontrado = false;
    this.motivoService.get("").subscribe(result => this.motivos = result);
    this.poblacionService.get("").subscribe(result => this.poblaciones = result);
  }


  buscar() {

    if (this.firstFormGroup.controls["identificacion"].invalid) {
        return this.error.log("debe digitar la identificación, para consultar al usuario");
    }

    var identificacion = this.firstFormGroup.controls["identificacion"].value;

    this.loginservice.getUserID(identificacion, "").subscribe(result => {
        if (result != null) {
          this.encontrado = true;
          this.cargarDatosUsuario(result);
        }
      }
    )



  }


  cargarDescripcion(descripcion: string) {
    this.descripcionMotivo = descripcion;
  }

  cargarDatosTurno() {
    this.turno.fechaFinalizacion = "";
    this.turno.descripcionOperacion = "";
    this.turno.contratistaAtendio = "";
    this.turno.refTiempo = "";
    this.turno.asistencia = "";
    this.turno.observacion= "";
    this.turno.motivo = this.firstFormGroup.controls["motivo"].value;
    this.turno.poblacion = this.firstFormGroup.controls["poblacion"].value;
    this.turno.refSolicitante = this.usuario.identificacion;
  }

  cargarDatosUsuario(usuarioDto: UserVista) {
    this.usuario = usuarioDto;
    this.firstFormGroup.patchValue(this.usuario);
    this.firstFormGroup.controls["password"].patchValue("******");
  }



}
