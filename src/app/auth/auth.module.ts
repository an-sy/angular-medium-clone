import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";


import { RegisterComponent } from "./components/register/register.component";
import { AuthService } from "./services/auth.service";
import { reducers } from "./store/reducer";
import { RegisterEffect } from "./store/effects/register.effect";
import { BackendErrorMessagesModule } from "../shared/modules/backendErrorMessages/backendErrorMessages.module";
import { PersistanceService } from "../shared/services/persistance.service";
import { LoginComponent } from "./components/login/login.component";
import { LoginEffect } from "./store/effects/login.effect";
import { GetCurrentUserEffect } from "./store/effects/getCurrentUser.effect";

const routes = [{
  path: "register",
  component: RegisterComponent
}, 
{
  path: "login",
  component: LoginComponent
}]

@NgModule({
  imports: [CommonModule, 
    RouterModule.forChild(routes), 
    ReactiveFormsModule, 
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect]),
    BackendErrorMessagesModule],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistanceService]
})

export class AuthModule {}