import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService) { }
  path = "http://localhost:49737/api/auth/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.http.post(this.path + "login", loginUser, { headers: headers, responseType: 'text' })
      .subscribe(data => {
        this.saveToken(data);
        this.userToken = data;
        this.decodedToken = this.jwtHelper.decodeToken(data.toString());
        this.alertifyService.success("Sisteme giriş yapıldı");
        this.router.navigateByUrl("/city");

      })
  }
  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")
    this.http.post(this.path + "register", registerUser, { headers: headers, responseType: 'text' })
      .subscribe(data => {

      })

  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY)
    this.alertifyService.error("Sistemden çıkış yapıldı")
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY)
  }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  getCurrentUserId() {
    return this.jwtHelper.decodeToken(this.token).nameid
  }

}
