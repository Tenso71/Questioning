import { Routes } from '@angular/router';
import { LoginComponent } from './components/principal/pages/login/login.component';
import { PrincipalComponent } from './components/principal/components/principal.component';

export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: '**', component: PrincipalComponent}
    
];
