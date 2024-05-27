import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MagServiceService {

  private magazine_Url = 'https://api.digitalbusinessreview.com/api/v1/magazine'

  constructor(private http : HttpClient, ) { }
  getMagazines(){
    return this.http.get(this.magazine_Url);
  }

  destroyMagazine(magazineID:number){
    console.log(magazineID);
    
    return this.http.delete(`https://api.digitalbusinessreview.com/api/v1/magazine/${magazineID}`)
  }

  getMagazineById(magazineID:number){
    console.log(magazineID);
    
    return this.http.get(`https://api.digitalbusinessreview.com/api/v1/magazine/${magazineID}`)
  }
}
