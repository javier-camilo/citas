import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Register } from 'src/app/Modelo/register';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

  operacion: string;
  hide = true;
  register: Register;

  constructor(private loginService:LoginService,private dialog:MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.register=new Register();
  }

   registrar(){


    let dialogo= this.dialog.open(DialogoConfirmacionComponent, {data:{name:"Advertencia", descripcion:"¿Estan todo los datos correctos?"} } );

    dialogo.afterClosed().subscribe(result => {
      if(result=="true"){
        this.loginService.registrar(this.register).subscribe(result =>
        {

        }
      );

      }
    });


  }

}
