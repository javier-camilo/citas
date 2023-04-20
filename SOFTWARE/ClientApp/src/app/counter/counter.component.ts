import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchDataComponent } from '../fetch-data/fetch-data.component';
import { CitasComponent } from '../Solicitante/citas/citas.component';
import { TicketComponent } from '../solicitante/ticket/ticket.component';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {


  public currentCount = 0;


  constructor(public dialogo: MatDialog) { }


  public incrementCounter() {
    this.currentCount++;
  }

  mostrarDialogoDos(): void {
    this.dialogo
      .open(TicketComponent, {
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
