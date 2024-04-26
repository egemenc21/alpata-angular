import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './auth.service';
import { environment } from '../../environments/environment';


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
