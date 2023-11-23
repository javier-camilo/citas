

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error-service.service';
import { Solicitante } from '../Modelo/solicitante';
import { Turno } from '../Modelo/turno';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}



@Injectable({
  providedIn: 'root'
})

export class TurnoService {

  baseUrl: string;

  constructor(private http: HttpClient,
    private handleErrorService: HandleHttpErrorService) {
      this.baseUrl='https://localhost:7240/';

  }


  get(operacion:string): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.baseUrl + 'api/Turno')
        .pipe(
            tap(_ =>
              {
              if(operacion==="turnoComponent")
              this.handleErrorService.log('Datos de los turnos recibidos');
              }
          ),
            catchError(this.handleErrorService.handleError<Turno[]>('Consulta solicitante', undefined))
        );
  }

  post(turno:Turno): Observable<Turno> {

    return this.http.post<Turno>(this.baseUrl + 'api/Turno', turno)
        .pipe(
            tap(_ => this.handleErrorService.log('turno registrado con exito')),
            catchError(this.handleErrorService.handleError<Turno>('Registrar turno',undefined))
    );

  }





}
