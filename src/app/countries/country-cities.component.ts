import { Component } from '@angular/core';
import { city } from './city';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule} from '@angular/material/table'

@Component({
  selector: 'app-country-cities',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './country-cities.component.html',
  styleUrl: './country-cities.component.css'
})
export class CountryCitiesComponent {

  public cities: city[] = [];
  public displayedColumns : string[] = ["cityId", "name", "lattitude","longitude"];
  id: number;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {this.id = -1}

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    let idparam = this.activatedRoute.snapshot.paramMap.get("id");
    this.id = idparam ? +idparam : -1;
    this.http.get<city[]>(`${environment.baseURL}api/Countries/countryCities/${this.id}`).subscribe(
      {
        next: result => this.cities = result,
        error:error => console.error(error)
      }
    );
  }
}

