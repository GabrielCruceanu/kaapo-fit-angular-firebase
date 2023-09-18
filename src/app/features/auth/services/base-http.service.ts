import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  private readonly BASE_URL = environment.FRONTEND_APP_BASE_URL;

  constructor(private router: Router, private httpClient: HttpClient) {}

  private _accessToken: string;
  get accessToken() {
    return this._accessToken ? this._accessToken : this.loadToken();
  }

  get(endpoint: string, options = {}, type: any) {
    Object.assign(options, this._getCommonOptions());

    return this.httpClient
      .get<typeof type>(`${this.BASE_URL}/${endpoint}`, options)
      .pipe(catchError(this._handleHttpError));
  }

  post(endpoint: string, data = {}, options = {}, type: any) {
    Object.assign(options, this._getCommonOptions());

    return this.httpClient
      .post<typeof type>(`${this.BASE_URL}/${endpoint}`, data, options)
      .pipe(catchError(this._handleHttpError));
  }

  delete(endpoint: string, options = {}, type: any) {
    Object.assign(options, this._getCommonOptions());

    return this.httpClient
      .delete<typeof type>(`${this.BASE_URL}/${endpoint}`, options)
      .pipe(catchError(this._handleHttpError));
  }

  patch(endpoint: string, data = {}, options = {}, type: any) {
    Object.assign(options, this._getCommonOptions());

    return this.httpClient
      .patch<typeof type>(`${this.BASE_URL}/${endpoint}`, data, options)
      .pipe(catchError(this._handleHttpError));
  }

  saveToken(accessToken: string) {
    this._accessToken = accessToken;
    return localStorage.setItem('accessToken', accessToken);
  }

  loadToken() {
    const token = localStorage.getItem('accessToken');
    this._accessToken = token;
    return token;
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }

  private _handleHttpError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if (error.status !== 401) {
      throw error;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  private _handle401() {
    window.location.hash = '/signin';
  }

  private _getCommonOptions() {
    const token = this.loadToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
}
