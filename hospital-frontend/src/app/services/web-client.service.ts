import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebClientService {

  TOKEN = '';
  API_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
    // Attempt to load token from localStorage if present
    const savedToken = localStorage.getItem('kamalmed_token');
    if (savedToken) {
      this.TOKEN = savedToken;
    }
  }

  public get<T>(url: string) {
    return this.http.get<T>(this.API_URL + url, {
      headers: {
        TOKEN: this.TOKEN,
        Authorization: this.TOKEN ? 'Bearer ' + this.TOKEN : ''
      }
    });
  }

  public post<T, R>(url: string, data: T) {
    return this.http.post<R>(this.API_URL + url, data, {
      headers: {
        TOKEN: this.TOKEN,
        Authorization: this.TOKEN ? 'Bearer ' + this.TOKEN : ''
      }
    });
  }

  public delete<T>(url: string) {
    return this.http.delete<T>(this.API_URL + url, {
      headers: {
        TOKEN: this.TOKEN,
        Authorization: this.TOKEN ? 'Bearer ' + this.TOKEN : ''
      }
    });
  }

  public put<T, R>(url: string, data: T) {
    return this.http.put<R>(this.API_URL + url, data, {
      headers: {
        TOKEN: this.TOKEN,
        Authorization: this.TOKEN ? 'Bearer ' + this.TOKEN : ''
      }
    });
  }

  public setToken(token: string) {
    this.TOKEN = token;
    localStorage.setItem('kamalmed_token', token);
  }

  public clearToken() {
    this.TOKEN = '';
    localStorage.removeItem('kamalmed_token');
  }

  public register<T, R>(url: string, data: T) {
    return this.http.post<R>(this.API_URL + url, data);
  }

  public login<T,R>(url : string,data : T){
    return this.http.post<R>(this.API_URL+url,data)
  }
}
