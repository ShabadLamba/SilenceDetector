import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Audio } from './audio';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  // Define API
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch audios list
  getAudios(): Observable<Audio> {
    return this.http
      .get<Audio>(this.apiURL + '/Audio')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch audio
  getAudio(type): Observable<Audio> {
    return this.http
      .get<Audio>(this.apiURL + '/Audio/' + type)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => upload audio
  uploadAudio(audio): Observable<Audio> {
    return this.http
      .post<Audio>(
        this.apiURL + '/Audio',
        JSON.stringify(audio),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update audio
  updateAudio(id, audio): Observable<Audio> {
    return this.http
      .put<Audio>(
        this.apiURL + '/employees/' + id,
        JSON.stringify(audio),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete audio
  deleteAudio(id) {
    return this.http
      .delete<Audio>(this.apiURL + '/Audio/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
