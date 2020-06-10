import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { Photo } from '../models/photo';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient,
    private router:Router,
    private alertifyService:AlertifyService) { }
  path = "http://localhost:49737/api/";

  getCities(): Observable<City[]> {

    return this.http.get<City[]>(this.path + "cities")
  }

  getCityById(cityId): Observable<City> {
    return this.http.get<City>(this.path + "cities/detail/?id=" + cityId);
  }

  getPhotosByCity(cityId): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.path + "cities/photos/?cityId=" + cityId)
  }
  add(city){
    this.http.post(this.path +'cities/add', city).subscribe(data =>{
   this.alertifyService.success("Şehir başarıyla eklendi")
    this.router.navigateByUrl("/citydetail/"+ data["id"])
  });
  }

}
