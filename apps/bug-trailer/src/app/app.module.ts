import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { SecretComponent } from './secret/secret.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ProjectComponent } from './project/project.component';
import { IssueComponent } from './issue/issue.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OneProjectComponent } from './one-project/one-project.component';
import { OneIssueComponent } from './one-issue/one-issue.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ChartsModule } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // SignUpComponent,
    // SecretComponent,
    AdminComponent,
    HomeComponent,
    ProjectComponent,
    IssueComponent,
    RegisterComponent,
    OneProjectComponent,
    OneIssueComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // BrowserModule,
    AppRoutingModule,
    // HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
