import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: BehaviorSubject<boolean> = new BehaviorSubject(true);

  private httpOptions: any = {
    headers: new HttpHeaders({
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    responseType: 'text'
  };

  constructor(private http: HttpClient) { }

  signIn(userForAuth: AuthUser): Observable<any> {
    return this.http.post('api/Account/Login', userForAuth, this.httpOptions);
  }

  getSession(): Observable<any> {
    return this.http.post('api/OperateMonitor/getSession', {}, this.httpOptions);
  }
}
