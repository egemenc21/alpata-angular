import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId = '';

  constructor(private httpClient: HttpClient) {}

  async getUserById(id: string): Promise<User> {
    const observable = this.httpClient.get<User>(
      `${environment.apiRoute}/api/User/${id}`
    );

    return await firstValueFrom(observable);
  }
}
