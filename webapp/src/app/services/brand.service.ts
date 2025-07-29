import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../types/brand';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http=inject(HttpClient);
  constructor() { }
  
  getBrands(){
     return this.http.get<Brand[]>(environment.apiUrl + "/brands");
  }

  getBrandbyId(id : string){
     return this.http.get<Brand>( environment.apiUrl + "/brands/"+ id);
  }
  addBrand(name:string){
    return this.http.post(environment.apiUrl + "/brands",{
      name: name,
    });
  }

  updateBrand(id:string, name:string){
    return this.http.put(environment.apiUrl + "/brands/" + id,{
      name: name,
    });    
  }

  deleteBrandbyId(id : string){
     return this.http.delete(environment.apiUrl + "/brands/"+ id);
  }
}
