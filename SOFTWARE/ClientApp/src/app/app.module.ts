import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { CitasComponent } from './Solicitante/citas/citas.component';
import { EstadoColaComponent } from './Solicitante/estado-cola/estado-cola.component';
import { TicketComponent } from './solicitante/ticket/ticket.component';
import { CrearusuarioComponent } from './administrador/gestionUsuario/crearusuario/crearusuario.component';
import { ConsultarusuarioComponent } from './administrador/gestionUsuario/consultarusuario/consultarusuario.component';
import { CrearhorarioComponent } from './administrador/gestionhorario/crearhorario/crearhorario.component';
import { ConsultarhorarioComponent } from './administrador/gestionhorario/consultarhorario/consultarhorario.component';
import { GenrarreporteComponent } from './administrador/genrarreporte/genrarreporte.component';
import { AtenderCitaComponent } from './atencion/atender-cita/atender-cita.component';
import { ReportesComponent } from './atencion/reportes/reportes.component';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { RegistrarMotivoComponent } from './Administrador/gestionMotivo/registrar-motivo/registrar-motivo.component';
import { ConsultarMotivoComponent } from './Administrador/gestionMotivo/consultar-motivo/consultar-motivo.component';
import { EdicionMotivoComponent } from './Administrador/gestionMotivo/edicion-motivo/edicion-motivo.component';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CitasComponent,
    DialogoConfirmacionComponent,
    EstadoColaComponent,
    TicketComponent,
    CrearusuarioComponent,
    ConsultarusuarioComponent,
    CrearhorarioComponent,
    ConsultarhorarioComponent,
    GenrarreporteComponent,
    AtenderCitaComponent,
    ReportesComponent,
    RegistrarMotivoComponent,
    ConsultarMotivoComponent,
    EdicionMotivoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'edicionMotivo/:codigoMotivo', component: EdicionMotivoComponent},
      { path: 'estadoCola', component: EstadoColaComponent},
      { path: 'registrarMotivo', component: RegistrarMotivoComponent},
      { path: 'consultarMotivo', component: ConsultarMotivoComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}

  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogoConfirmacionComponent
  ]
})
export class AppModule { }
