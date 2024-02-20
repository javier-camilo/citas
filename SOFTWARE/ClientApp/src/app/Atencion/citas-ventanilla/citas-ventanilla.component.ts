import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Motivo } from 'src/app/Modelo/motivo';
import { Poblacion } from 'src/app/Modelo/poblacion';
import { Register, UserVista } from 'src/app/Modelo/register';
import { LoginService } from 'src/app/servicios/login.service';
import { MotivoService } from 'src/app/servicios/motivo.service';
import { PoblacionServiceService } from 'src/app/servicios/poblacion-service.service';
import { Turno } from '../../Modelo/turno';

@Component({
  selector: 'app-citas-ventanilla',
  templateUrl: './citas-ventanilla.component.html',
  styleUrls: ['./citas-ventanilla.component.css']
})
export class CitasVentanillaComponent implements OnInit {


  protected identificacion: string;
  protected usuario: UserVista;
  protected turno: Turno;
  protected motivos: Motivo[];
  protected poblaciones: Poblacion[];

   protected isLinear = true;
  protected encontrado: boolean;
  protected hide = true;

  firstFormGroup = this._formBuilder.group({
    userName: ['hola', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    identificacion: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    motivo: ['', Validators.required],
    poblacion:['', Validators.required]
  });


  constructor(private loginservice: LoginService, private _formBuilder: FormBuilder, private motivoService: MotivoService,
    private poblacionService: PoblacionServiceService) { }

  ngOnInit(): void {

    this.cargarDatos();

    console.log(this.firstFormGroup.value);
    //this.firstFormGroup.get('userName')?.patchValue("nuevo");

  }

  cargarDatos() {
    this.usuario = new UserVista();
    this.turno = new Turno();
    this.motivoService.get("").subscribe(result => this.motivos = result);
    this.poblacionService.get("").subscribe(result=>this.poblaciones=result);
  }



}
