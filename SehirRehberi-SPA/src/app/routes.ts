
import { Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { ValueComponent } from './value/value.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityAddComponent } from './city/city-add/city-add.component';
import { RegisterComponent } from './register/register.component';


export const appRoutes : Routes = [
    { path: "city", component: CityComponent },
    { path: "cityadd", component: CityAddComponent },
    { path: "register", component: RegisterComponent },
    { path: "value", component: ValueComponent },
    { path: "citydetail/:cityId", component: CityDetailComponent },
    { path: "**", redirectTo: "city", pathMatch: "full" }
];
