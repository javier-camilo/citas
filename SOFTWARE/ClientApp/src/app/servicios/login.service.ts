import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error-service.service';
import { Motivo } from '../Modelo/motivo';
import { Login } from '../Modelo/login';
import { Router } from '@angular/router';
import { Register } from '../Modelo/register';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  baseUrl: string;

  constructor(private http: HttpClient,
    private handleErrorService: HandleHttpErrorService, private router: Router) {

      this.baseUrl='https://localhost:7240/';
  }


  post(login:Login): Observable<string> {
    return this.http.post<string>(this.baseUrl + 'api/Auth/login', login)
        .pipe(
            tap((res:any)=>

            {
                this.handleErrorService.log("se incio sesion correctamente");

            }

              ),
            catchError(this.handleErrorService.handleError<string>('usuario o contraseña invalidos',undefined))
        );
  }

  registrar(register:Register): Observable<Register> {
    return this.http.post<Register>(this.baseUrl + 'api/Auth/register', register)
        .pipe(
            tap((res:any)=>

              {
                  this.handleErrorService.log("el ussuario se registro correctamente");
              }
              ),
            catchError(this.handleErrorService.handleError<Register>('usuario o contraseña invalidos',undefined))
        );
  }

  IsLoggedIn(){
    return localStorage.getItem('token')!=null;
  }


  GetToken(){
    return localStorage.getItem('token')||'';
   }


  logoutUser(){
    localStorage.removeItem('token');
  }

}
