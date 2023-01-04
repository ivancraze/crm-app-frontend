import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component'
import { authReducer } from './store/reducers';
import { AuthService } from './services/auth.service'
import { PersistanceService } from '../shared/services/persistance.service'
import { RegisterEffect } from './store/effects/register.effect'
import { LoginEffect } from './store/effects/login.effect'
import { GetCurrentUserEffect } from './store/effects/getCurrentUser.effect'
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorMessages.module'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect]),
    BackendErrorMessagesModule
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistanceService]
})

export class AuthModule {}
