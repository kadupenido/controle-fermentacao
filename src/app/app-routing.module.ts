import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FermentacaoComponent } from './fermentacao/fermentacao.component';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'fermentacao', component: FermentacaoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/fermentacao', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
