import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Register, UserVista } from 'src/app/Modelo/register';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-citas-ventanilla',
  templateUrl: './citas-ventanilla.component.html',
  styleUrls: ['./citas-ventanilla.component.css']
})
export class CitasVentanillaComponent implements OnInit {

  protected isLinear = true;
  protected identificacion: string;
  protected usuario: UserVista;

  protected checked = false;
  protected hide = true;
  protected register:Register;

  firstFormGroup = this._formBuilder.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    identificacion: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });


  constructor(private loginservice: LoginService,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.register = new Register();
    //this.firstFormGroup.get('userName')?.patchValue("nuevo");
  }

}
