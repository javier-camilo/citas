
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error-service.service';
import { Tiempo,HorarioInputModel } from '../Modelo/tiempo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


@Injectable({
  providedIn: 'root'
})



export class TiempoService {

  baseUrl: string;

  constructor(private http: HttpClient,
    private handleErrorService: HandleHttpErrorService) {
      this.baseUrl='https://localhost:7240/';
  }

  getTiempo(operacion:string): Observable<Tiempo[]> {
    return this.http.get<Tiempo[]>(this.baseUrl + 'api/Tiempo/listadoTiempo')
        .pipe(
            tap(_ =>
              {
              if(operacion==="TiempoComponent")
              this.handleErrorService.log('Datos del tiempo recibido');
              }
          ),
            catchError(this.handleErrorService.handleError<Tiempo[]>('Consulta tiempo', undefined))
        );
  }

  post(horarioInput:HorarioInputModel): Observable<HorarioInputModel> {

    return this.http.post<HorarioInputModel>(this.baseUrl + 'api/Tiempo', horarioInput)
        .pipe(
            tap(_ => this.handleErrorService.log('Guardado con exito')),
            catchError(this.handleErrorService.handleError<HorarioInputModel>('Registrar tiempo',undefined))
        );
  }

}
