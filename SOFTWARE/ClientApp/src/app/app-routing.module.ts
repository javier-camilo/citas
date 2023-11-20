
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
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
import { RegistroComponent } from './gestionUsuarios/registro/registro.component';
import { LayoutComponent } from './gestionUsuarios/layout/layout.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { OwnerRoleGuard } from './guards/owner-role.guard';

const routes: Routes = [

    {path: 'registro', component: RegistroComponent },
    {path:'login',component: LoginComponent},
    {
      path:'',
      component:NavMenuComponent,
      children:  [
        { path: 'home', component: HomeComponent},
        {path:'', redirectTo:'home', pathMatch:'full'},
        { path: 'counter', component: CounterComponent },
        { path: 'registroDatos', component: CitasComponent},
        { path: 'cola', component: FetchDataComponent},
        { path: 'citas', component: RegsitroSolicitanteComponent },
        { path: 'consultaSolicitante', component: ConsultaSolicitanteComponent},
        { path: 'registrarPoblacion', component: RegistrarPoblacionComponent, canActivate:[AdminRoleGuard]},
        { path: 'consultarPoblacion', component: ConsultarPoblacionComponent, canActivate:[AdminRoleGuard]},
        { path: 'edicionPoblacion/:codigoPoblacion', component: EditarPoblacionComponent, canActivate:[OwnerRoleGuard]},
        { path: 'edicionMotivo/:codigoMotivo', component: EdicionMotivoComponent, canActivate:[OwnerRoleGuard]},
        { path: 'registrarMotivo', component: RegistrarMotivoComponent, canActivate:[OwnerRoleGuard]},
        { path: 'consultarMotivo', component: ConsultarMotivoComponent, canActivate:[OwnerRoleGuard]},
      ],canActivate:[AuthGuard]
    },
    {
      path:'**',
      component:NavMenuComponent,
      canActivate:[AuthGuard]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
