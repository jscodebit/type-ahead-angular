import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Patient } from '../shared/patient.model';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};

const baseURL : string = 'https://6195803474c1bd00176c6d9a.mockapi.io/api/v1/patient';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  invokeHttpRequest(url: string){
    return this.http.get<Patient[]>(url, httpOptions)
      .pipe(catchError(HttpClientService.handleError));
  }

  getAllPatientsDetails(): Observable<Patient[]>{
    let url = `${baseURL}?page=1&limit=100`;
    return this.invokeHttpRequest(url) as Observable<Patient[]>;
  }

  getPatientByFirstName(patient_name: string): Observable<Patient[]>{
    let url = `${baseURL}?firstName=${patient_name}`;
    return this.invokeHttpRequest(url) as Observable<Patient[]>;
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
    }
    return throwError(
        'Something bad happened; please try again later.');
  }
}
