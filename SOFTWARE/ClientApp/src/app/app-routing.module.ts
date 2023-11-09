
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsultarMotivoComponent } from './Administrador/gestionMotivo/consultar-motivo/consultar-motivo.component';
import { EdicionMotivoComponent } from './Administrador/gestionMotivo/edicion-motivo/edicion-motivo.component';
import { RegistrarMotivoComponent } from './Administrador/gestionMotivo/registrar-motivo/registrar-motivo.component';
import { ConsultarPoblacionComponent } from './Administrador/gestionPoblacion/consultar-poblacion/consultar-poblacion.component';
import { EditarPoblacionComponent } from './Administrador/gestionPoblacion/editar-poblacion/editar-poblacion.component';
import { RegistrarPoblacionComponent } from './Administrador/gestionPoblacion/registrar-poblacion/registrar-poblacion.component';
import { CitasComponent } from './Solicitante/citas/citas.component';
import { EstadoColaComponent } from './Solicitante/estado-cola/estado-cola.component';
import { ConsultaSolicitanteComponent } from './Solicitante/gestionSolicitante/consulta-solicitante/consulta-solicitante.component';
import { RegsitroSolicitanteComponent } from './Solicitante/gestionSolicitante/regsitro-solicitante/regsitro-solicitante.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './gestionUsuarios/login/login.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'counter', component: CounterComponent },
    { path: 'registroDatos', component: CitasComponent },
    { path: 'fetch-data', component: FetchDataComponent },
    { path: 'citas', component: RegsitroSolicitanteComponent },
    { path: 'consultaSolicitante', component: ConsultaSolicitanteComponent},
    { path: 'registrarPoblacion', component: RegistrarPoblacionComponent},
    { path: 'consultarPoblacion', component: ConsultarPoblacionComponent},
    { path: 'edicionPoblacion/:codigoPoblacion', component: EditarPoblacionComponent},
    { path: 'edicionMotivo/:codigoMotivo', component: EdicionMotivoComponent},
    { path: 'estadoCola', component: EstadoColaComponent},
    { path: 'registrarMotivo', component: RegistrarMotivoComponent},
    { path: 'consultarMotivo', component: ConsultarMotivoComponent},
    { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
