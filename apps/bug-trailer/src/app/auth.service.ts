import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  success: boolean;
  message: string;
}

@Injectable()
export class AuthService {
  private loggedInStatus = JSON.parse(
    localStorage.getItem('loggedIn') || 'false'
  );

  constructor(private http: HttpClient) {}

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', value.toString());
  }

  get isLoggedIn() {
    return JSON.parse(
      localStorage.getItem('loggedIn') || this.loggedInStatus.toString()
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getUserDetails(name: any, password: any, email: any) {
    // post these details to API server return user info if correct
    return this.http.post<myData>('http://localhost:3333/api/auth/login', {
      email: email.toLowerCase().trim(),
      name: name,
      password: password,
    });
  }
  register(name: any, password: any, email: any) {
    // post these details to API server return user info if correct
    return this.http.post<myData>('http://localhost:3333/api/auth/register', {
      email: email.toLowerCase().trim(),
      name: name,
      password: password,
    });
  }
  getAllUsers() {
    console.log('getProject ran with name ');
    return this.http.get<any>(`http://localhost:3333/api/user`);
  }

  loggOut() {
    this.setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }
}
// when the person click register, goes to the register form, add a function that posts to
//'http://localhost:3000/auth/register', creates the user, calls login and load to admin
