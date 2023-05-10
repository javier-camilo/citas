import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error-service.service';
import { Motivo } from '../Modelo/motivo';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MotivoService {


  baseUrl: string;

  constructor(private http: HttpClient,
    private handleErrorService: HandleHttpErrorService) {
      this.baseUrl='https://localhost:7240';

  }

  post(motivo:Motivo): Observable<Motivo> {

    return this.http.post<Motivo>(this.baseUrl + '/api/Motivo', motivo)
        .pipe(
            tap(_ => this.handleErrorService.log('Guardado con exito')),
            catchError(this.handleErrorService.handleError<Motivo>('Registrar motivo',undefined))
        );
  }


  get(operacion:string): Observable<Motivo[]> {
    return this.http.get<Motivo[]>(this.baseUrl + '/api/Motivo')
        .pipe(
            tap(_ =>

              {

              if(operacion==="motivoComponent")
              this.handleErrorService.log('Datos de la areas recibido');

              }
          ),
            catchError(this.handleErrorService.handleError<Motivo[]>('Consulta area', undefined))
        );
  }

}
