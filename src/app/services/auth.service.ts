import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

interface UserRegister {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  files: File;
}

export interface JwtUser {
  id: string;
  email: string;
  token: string;
}

export interface RegistrationResponse {
  succeeded: boolean;
  message: string;
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

  register(registerData: FormData): Observable<RegistrationResponse> {
    return this.httpClient.post<RegistrationResponse>(
      `${this.url}/api/User/register`,
      registerData
    );
  }

  async toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }
}
