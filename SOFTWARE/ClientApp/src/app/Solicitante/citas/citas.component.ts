import { OnInit } from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {


  identificacionFormControl = new FormControl('', [Validators.required]);
  nombreFormControl = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'digite un valor para la direccion de correo';
    }
    return this.email.hasError('email') ? 'no es un email valido' : '';
  }

  constructor(public dialogo: MatDialog,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }


  mostrarDialogo(): void {
    this.dialogo.open(DialogoConfirmacionComponent, {data: {name:"Señor Usuario", descripcion: "guardado exitoso", EsMensaje: "true"}});
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

}
