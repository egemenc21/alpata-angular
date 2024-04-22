import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

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

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  url = 'http://localhost:5008';

  constructor(private httpClient: HttpClient) {}

  async signIn(email: string, password: string): Promise<User[]> {
    let users: User[] = [];

    // const params = new HttpParams().set('id', 1);
    // const params2 = new HttpParams({fromObject: {id :1, sort: "asc"}})
    // const headers = new HttpHeaders()
    // .set("Authorization", `Bearer ${this.token}`)
    // .set("accept", "/")

    this.httpClient.get<User[]>(`${this.url}/api/User`).subscribe({
      next: (data) => (users = data),
      error: (error) => console.log(error),
    });

    // const response = await axios.post(this.url + 'api/User/login', {
    //   email,
    //   password,
    // });
    // const data = response.data;
    // localStorage.setItem('token', data);

    // const headers2 = {
    //   Authorization: `Bearer ${this.token}`
    // };

    // const response = await axios.get(this.url + '/api/User', {
    //   headers: headers2
    // });

    // const data = await response.data
    
    // users = data


    return users;
  }
}
