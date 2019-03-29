import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { RoleGuard } from './guards/role.guard';

import { HomeComponent }  from './web/home/home.component';
import { LoginComponent as Web } from './web/login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
                          {  path: '', component:Web },
                          {  path: 'homew',canActivate: [RoleGuard],data: {role: '1'}, component:HomeComponent },
                          { path: 'home', canActivate: [RoleGuard],data: {role: '1'}, loadChildren: './web/website/website.module#WebsiteModule' },
                          {  path: 'register', component:RegisterComponent },
                          {  path: 'admin', component:LoginComponent },
                          {  path: 'forgot-password', component:ForgotPasswordComponent },
                          {  path: 'reset-password/:token', component:ResetPasswordComponent },
                          {  path: 'admin', canActivate: [AuthGuard], loadChildren:'./admin/admin.module#AdminModule' },
                          {  path: '**', component: PageNotFoundComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [LoginComponent, RegisterComponent, PageNotFoundComponent]
