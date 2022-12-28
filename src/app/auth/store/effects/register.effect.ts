import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'

import { registerAction, registerFailureAction, registerSuccessAction } from '../actions/register.action'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'
import { PersistanceService } from '../../../shared/services/persistance.service'

@Injectable()
export class RegisterEffect {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persitanceService: PersistanceService,
    private router: Router
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persitanceService.set('accessToken', currentUser.token)
            return registerSuccessAction({currentUser})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailureAction({errors: errorResponse.error.errors}))
          })
        )
      })
    )
  )

  redicrectAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerSuccessAction),
      tap(() => {
        this.router.navigateByUrl('/')
      })
    ),
    {dispatch: false}
  )
}
