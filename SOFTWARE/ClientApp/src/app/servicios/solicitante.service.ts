import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error-service.service';
import { Solicitante } from '../Modelo/solicitante';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SolicitanteService {


  baseUrl: string;

  constructor(private http: HttpClient,
    private handleErrorService: HandleHttpErrorService) {
      this.baseUrl='https://localhost:7240/';

  }

  post(solicitante:Solicitante): Observable<Solicitante> {

    return this.http.post<Solicitante>(this.baseUrl + 'api/Solicitante', solicitante)
        .pipe(
            tap(_ => this.handleErrorService.log('Guardado con exito')),
            catchError(this.handleErrorService.handleError<Solicitante>('Registrar solicitante',undefined))
        );
  }


  get(operacion:string): Observable<Solicitante[]> {
    return this.http.get<Solicitante[]>(this.baseUrl + 'api/Solicitante')
        .pipe(
            tap(_ =>

              {
              if(operacion==="solicitanteComponent")
              this.handleErrorService.log('Datos de los solicitante recibido');
              }
          ),
            catchError(this.handleErrorService.handleError<Solicitante[]>('Consulta solicitante', undefined))
        );
  }



}
