import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  url = 'http://localhost:5008/';

  constructor(private http: HttpClient) {}

  async signIn(email: string, password: string): Promise<string> {
    const response = await axios.post(this.url + 'api/User/login', {
      email,
      password,
    });
    const data = response.data;
    localStorage.setItem('token', data);
    return data;
  }
}
