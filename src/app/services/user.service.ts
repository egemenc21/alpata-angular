import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from './auth.service';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

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

  getUserIdFromToken(token: string): string | null {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
