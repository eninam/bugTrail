import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { SecretComponent } from './secret/secret.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ProjectComponent } from './project/project.component';
import { IssueComponent } from './issue/issue.component';
import { OneProjectComponent } from './one-project/one-project.component';
import { OneIssueComponent } from './one-issue/one-issue.component';
const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
  {
    path: 'project/:id',
    component: OneProjectComponent,
    canActivate: [AuthGuard],
  },
  { path: 'issue', component: IssueComponent, canActivate: [AuthGuard] },
  { path: 'issue/:id', component: OneIssueComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  // { path: 'secret', component: SecretComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
