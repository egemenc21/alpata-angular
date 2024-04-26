import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './auth.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  userId = ''

  constructor(private httpClient: HttpClient) {}

  getUserById(id: string) : Observable<User>{
    return this.httpClient.get<User>(`${environment.apiRoute}/api/User/${id}`);
  }
}
