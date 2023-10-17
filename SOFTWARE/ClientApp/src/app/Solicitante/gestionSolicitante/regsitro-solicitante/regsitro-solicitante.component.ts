import { Component, OnInit } from '@angular/core';
import { SolicitanteService } from 'src/app/servicios/solicitante.service';
import { MatDialog } from '@angular/material/dialog';
import { Solicitante } from 'src/app/Modelo/solicitante';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';

import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-regsitro-solicitante',
  templateUrl: './regsitro-solicitante.component.html',
  styleUrls: ['./regsitro-solicitante.component.css']
})
export class RegsitroSolicitanteComponent implements OnInit {


  solicitante:Solicitante;
  respuesta:string;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private solicitanteService:SolicitanteService, private dialog:MatDialog,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.solicitante= new Solicitante();
  }


  guardar(): void{


    let ref = this.dialog.open(DialogoConfirmacionComponent, {data: {name:"Guardar", descripcion:"¿desea Registrar Los Datos?"}});

      ref.afterClosed().subscribe(result => {
        this.respuesta=result;
        this.add(this.respuesta);
      })


  }

  add(resultado:string){


    if (resultado=="true") {

      this.solicitanteService.post(this.solicitante).subscribe();
      this.limpiar();
    }


  }

  limpiar(){

    this.solicitante.nombre="";

    this.solicitante.identificacion="";

    this.solicitante.correo="";

    this.solicitante.telefono="";

  }


}
