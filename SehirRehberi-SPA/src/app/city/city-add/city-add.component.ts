import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css'],
  providers: [CityService]
})
export class CityAddComponent implements OnInit {

  constructor(private cityService: CityService,
    private formBuilder: FormBuilder) { }

  city: City;
  cityAddForm: FormGroup;

  createCityFrom() {
    this.cityAddForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required]
      })

  }

  ngOnInit() {
    this.createCityFrom();
  }

  add(){
    if(this.cityAddForm.valid){
      this.city = Object.assign({}, this.cityAddForm.value)
      this.city.userId = 1;
      this.cityService.add(this.city);
      
    }
  }

}
