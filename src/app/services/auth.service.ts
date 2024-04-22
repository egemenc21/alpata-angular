import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
export class AuthService {
  private jwtToken;
  private readonly url = 'http://localhost:5008';

  constructor(private httpClient: HttpClient) {}

  getAuthToken(): string {
    return this.jwtToken;
  }

  async signIn(email: string, password: string) {
    this.httpClient
      .post<JwtUser>(`${this.url}/api/User/login`, {
        email,
        password,
      })
      .subscribe({
        next: (res) => {
          this.jwtToken = res.token;
          localStorage.setItem('token', res.token);
        },
        error: (err) => console.log(err),
      });

    return this.jwtToken;
  }
}
