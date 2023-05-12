import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error-service.service';
import { Poblacion } from '../Modelo/poblacion';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PoblacionServiceService {

  

  baseUrl: string;

  constructor(private http: HttpClient,
    private handleErrorService: HandleHttpErrorService) {
      this.baseUrl='https://localhost:7240/';

  }

  post(poblacion:Poblacion): Observable<Poblacion> {

    return this.http.post<Poblacion>(this.baseUrl + 'api/Poblacion', poblacion)
        .pipe(
            tap(_ => this.handleErrorService.log('Guardado con exito')),
            catchError(this.handleErrorService.handleError<Poblacion>('Registrar motivo',undefined))
        );
  }

  get(operacion:string): Observable<Poblacion[]> {
    return this.http.get<Poblacion[]>(this.baseUrl + 'api/Poblacion')
        .pipe(
            tap(_ =>

              {

              if(operacion==="poblacionComponent")
              this.handleErrorService.log('Datos de la poblacion recibido');

              }
          ),
            catchError(this.handleErrorService.handleError<Poblacion[]>('Consulta poblacion', undefined))
        );
  }



}
