import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './AppModule';
import { RegistroComponent } from './gestionUsuarios/registro/registro.component';
import { LayoutComponent } from './gestionUsuarios/layout/layout.component';
import { PerfilComponent } from './gestionUsuarios/perfil/perfil.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ColaAtencionComponent } from './Atencion/cola-atencion/cola-atencion.component';
import { RolesComponent } from './Administrador/gestionPermiso/roles/roles.component';
import { RegistrarAtencionComponent } from './Atencion/registrar-atencion/registrar-atencion.component';
import { RegistroAdminComponent } from './Administrador/gestionPermiso/registro-admin/registro-admin.component';
import { CitasVentanillaComponent } from './Atencion/citas-ventanilla/citas-ventanilla.component';
import { ConsultarHistoricoComponent } from './Atencion/gestionarHistorico/consultar-historico/consultar-historico.component';
import { HistoricoComponent } from './Atencion/gestionarHistorico/historico/historico.component';
import { ConsultaTurnoComponent } from './Solicitante/consulta-turno/consulta-turno.component';
import { InformacionTurnoUsuarioComponent } from './Solicitante/informacion-turno-usuario/informacion-turno-usuario.component';


@NgModule({
    imports: [ServerModule],
    bootstrap: [AppComponent],
    declarations: [
      RegistroComponent,
      LayoutComponent,
      PerfilComponent,
      PageNotFoundComponent,
      ColaAtencionComponent,
      RolesComponent,
      RegistrarAtencionComponent,
      RegistroAdminComponent,
      CitasVentanillaComponent,
      ConsultarHistoricoComponent,
      HistoricoComponent,
      ConsultaTurnoComponent,
      InformacionTurnoUsuarioComponent
    ]
})
export class AppServerModule { }
