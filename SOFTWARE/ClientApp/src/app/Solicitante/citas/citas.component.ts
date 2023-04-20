import { OnInit } from '@angular/core';
import {Solicitante} from '../model/solicitante';
import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
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

  constructor(public dialogo: MatDialog) { }

  ngOnInit(): void {
  }


  mostrarDialogo(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿esta seguro, que todo esta correcto?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          alert("registrado exitoso");
        } else {
          alert("vale, realice la correcion");
        }
      });
  }

 




}
