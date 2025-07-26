import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../types/Category';
import { environment } from '../../environments/environment.development';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  http=inject(HttpClient);
  constructor() { }
  
  getCategories(){
     return this.http.get<Category[]>(environment.apiUrl + "/category");
  }

  getCategorybyId(id : string){
     return this.http.get<Category>(environment.apiUrl + "/category/"+ id);
  }
  
  addCategory(name:string){
    return this.http.post(environment.apiUrl + "/category",{
      name: name,
    });
  }

  updateCategory(id:string, name:string){
    return this.http.put(environment.apiUrl + "/category/" + id,{
      name: name,
    });    
  }

  deleteCategorybyId(id : string){
     return this.http.delete(environment.apiUrl + "/category/"+ id);
  }
}
