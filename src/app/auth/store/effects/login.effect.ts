import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'

import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login.action'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'
import { PersistanceService } from '../../../shared/services/persistance.service'

@Injectable()
export class LoginEffect {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persitanceService: PersistanceService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persitanceService.set('accessToken', currentUser.token)
            return loginSuccessAction({currentUser})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailureAction({errors: errorResponse.error.errors}))
          })
        )
      })
    )
  )

  redicrectAfterSubmit$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/')
        })
      ),
    {dispatch: false}
  )
}
