
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
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './gestionUsuarios/login/login.component';
import { RegistroComponent } from './gestionUsuarios/registro/registro.component';
import { LayoutComponent } from './gestionUsuarios/layout/layout.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { OwnerRoleGuard } from './guards/owner-role.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PerfilComponent } from './gestionUsuarios/perfil/perfil.component';
import { RolesComponent } from './Administrador/gestionPermiso/roles/roles.component';
import { ColaAtencionComponent } from './Atencion/cola-atencion/cola-atencion.component';
import { RegistrarAtencionComponent } from './Atencion/registrar-atencion/registrar-atencion.component';

const routes: Routes = [

    {path: 'registro', component: RegistroComponent },
    {path:'login',component: LoginComponent},
    {
      path:'',
      component:NavMenuComponent,
      children:  [
        { path: 'home', component: HomeComponent },
        { path: 'perfil', component: PerfilComponent},
        { path:'', redirectTo:'home', pathMatch:'full'},
        { path: 'registroCita', component: CitasComponent},
        { path: 'cola', component: FetchDataComponent},
        { path: 'registrarPoblacion', component: RegistrarPoblacionComponent, canActivate:[AdminRoleGuard]},
        { path: 'consultarPoblacion', component: ConsultarPoblacionComponent, canActivate:[AdminRoleGuard]},
        { path: 'edicionPoblacion/:codigoPoblacion', component: EditarPoblacionComponent, canActivate:[OwnerRoleGuard]},
        { path: 'edicionMotivo/:codigoMotivo', component: EdicionMotivoComponent, canActivate:[OwnerRoleGuard]},
        { path: 'registrarMotivo', component: RegistrarMotivoComponent, canActivate:[OwnerRoleGuard]},
        { path: 'consultarMotivo', component: ConsultarMotivoComponent, canActivate: [OwnerRoleGuard] },
        { path: 'roles', component: RolesComponent, canActivate: [OwnerRoleGuard] },
        { path: 'colaAtencion', component: ColaAtencionComponent},
        { path: 'registrarAtencion/:codigoTurno', component: RegistrarAtencionComponent},
      ],canActivate:[AuthGuard]
    },
    {
      path:'**',
      component:PageNotFoundComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
