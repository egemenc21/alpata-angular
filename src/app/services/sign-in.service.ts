import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

interface User {
  id: string;
  userName: string;
  name: string;
  surname: string;
  email: string;
  passwordHash: string;
  phoneNumber: string;
  profilePictureUrl: string;
}

export interface JwtUser {
  id: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  url = 'http://localhost:5008';
  response: JwtUser;

  constructor(private httpClient: HttpClient) {}

  async signIn(email: string, password: string): Observable<JwtUser> {
   

    return  this.httpClient
      .post<JwtUser>(`${this.url}/api/User/login`, { email, password })
      .subscribe({
        next: (data) => (data = this.response),
        error: (error) => console.log(error),
      });;
  }
}
