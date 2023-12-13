import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  signup(user: User): Observable<any> {
    return this.http.post<any>(this.authUrl, user)

  }

  signin(user: User): Observable<any> {
    return this.http.post(`${this.authUrl}`, user);
  }

}
