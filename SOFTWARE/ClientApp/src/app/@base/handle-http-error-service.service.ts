import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';


@Injectable({
  providedIn: 'root'
})


export class HandleHttpErrorService {


  constructor(private dialog:MatDialog) { }

  public handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
     if (error.status == '500') {
        this.mostrarError500(error);
     }
     if (error.status == '400') {
       this.mostrarError500(error);
     }

      return of(result as T);
    };
  }

  public log(message: string) {
    this.dialog.open(DialogoConfirmacionComponent, {data: {name:"Señor Usuario", descripcion: message, EsMensaje: "true"}});
  }

  private mostrarError500(error: any) {

    var message="verifique todos los campos";
    this.dialog.open(DialogoConfirmacionComponent, {data: {name:"Señor Usuario, hubo un error", descripcion: message, EsMensaje: "true"}});
    console.log(error);
  }


}