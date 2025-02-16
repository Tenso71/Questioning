import { Routes } from '@angular/router';
import { LoginComponent } from './components/principal/pages/login/login.component';
import { PrincipalComponent } from './components/principal/components/principal.component';
import { RegistroComponent } from './components/principal/pages/register/registro/registro.component';
import { SettingsComponent } from './components/principal/pages/settings/settings.component';
import { SubirPublicacionComponent } from './components/principal/pages/subirpubli/subirpublicacion/subirpublicacion.component';
export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'settings', component: SettingsComponent}, 
    {path: 'subirpublicacion', component: SubirPublicacionComponent},
    {path: '**', component: PrincipalComponent}
   
   
    
];
