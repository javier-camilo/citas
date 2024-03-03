import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './AppModule';
import { RegistroComponent } from './gestionUsuarios/registro/registro.component';
import { LayoutComponent } from './gestionUsuarios/layout/layout.component';
import { PerfilComponent } from './gestionUsuarios/perfil/perfil.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ColaAtencionComponent } from './Atencion/cola-atencion/cola-atencion.component';
import { RoleComponent } from './Administrador/gestionPermiso/role/role.component';
import { RolesComponent } from './Administrador/gestionPermiso/roles/roles.component';
import { RegistrarAtencionComponent } from './Atencion/registrar-atencion/registrar-atencion.component';
import { RegistroAdminComponent } from './Administrador/gestionPermiso/registro-admin/registro-admin.component';
import { CitasVentanillaComponent } from './Atencion/citas-ventanilla/citas-ventanilla.component';
import { GestionarHistoricoComponent } from './Atencion/gestionar-historico/gestionar-historico.component';
import { ConsultarHistoricoComponent } from './Atencion/gestionarHistorico/consultar-historico/consultar-historico.component';
import { HistoricoComponent } from './Atencion/gestionarHistorico/historico/historico.component';

@NgModule({
    imports: [AppModule, ServerModule, ModuleMapLoaderModule],
    bootstrap: [AppComponent],
    declarations: [
      RegistroComponent,
      LayoutComponent,
      PerfilComponent,
      PageNotFoundComponent,
      ColaAtencionComponent,
      RoleComponent,
      RolesComponent,
      RegistrarAtencionComponent,
      RegistroAdminComponent,
      CitasVentanillaComponent,
      GestionarHistoricoComponent,
      ConsultarHistoricoComponent,
      HistoricoComponent
    ]
})
export class AppServerModule { }
