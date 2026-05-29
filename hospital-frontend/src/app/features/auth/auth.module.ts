import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CallbackComponent } from './callback/callback.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, CallbackComponent],
  imports: [SharedModule, RouterModule.forChild([
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'callback', component: CallbackComponent }
  ])]
})
export class AuthModule {}
