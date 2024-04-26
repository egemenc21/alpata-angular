import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface User {
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
  constructor(private httpClient: HttpClient) {}

  getAuthToken(): string {
    return this.jwtToken;
  }

  public setAuthToken(value: string | null): void {
    this.jwtToken = value;
  }

  signIn(email: string, password: string): Observable<JwtUser> {
    return this.httpClient.post<JwtUser>(`${environment.apiRoute}/api/User/login`, {
      email,
      password,
    });
  }

  register(registerData: FormData): Observable<RegistrationResponse> {
    return this.httpClient.post<RegistrationResponse>(
      `${environment.apiRoute}/api/User/register`,
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
