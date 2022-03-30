import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


// User interface
export class User {
  name: String;
  email: String;
  password: String;
  password_confirmation: String
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // User registration
  register(user: User): Observable<any> {
    return this.http.post(this.baseUrl + 'register', user);
  }

  // Login
  login(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', user);
  }
  // Forget Password
  forgetPassword(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'forgetPassword', user);
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(this.baseUrl + 'getProfile');
  }

  setCurrentUserName(user) {
    console.log(user)
    localStorage.setItem('UserName', user.name);
    localStorage.setItem('UserId', user.id);
    localStorage.setItem('department', user.department);
  }
  getCurrentUserName() {
    return localStorage.getItem('UserName');
  }
  setCurrentUserType(user) {
    localStorage.setItem('UserType', user.user_type);
  }
  getCurrentUserType() {
    return localStorage.getItem('UserType');
  }
  logout() {
    localStorage.removeItem('UserName')
    localStorage.removeItem('UserType')
    localStorage.removeItem('UserId')
    localStorage.removeItem('department')
    localStorage.removeItem('auth_token')
  }
}
