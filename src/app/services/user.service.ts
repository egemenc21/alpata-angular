import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private readonly url = 'http://localhost:5008';
  userId = ''

  constructor(private httpClient: HttpClient) {}

  getUserById(id: string) : Observable<User>{
    return this.httpClient.get<User>(`${this.url}/api/User/${id}`);
  }
}
