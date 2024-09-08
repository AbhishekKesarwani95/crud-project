import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { companyModel } from '../model/companyModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  apiUrl='http://localhost:3000/company';

  getAllCompany():Observable<companyModel[]>{
    return this.http.get<companyModel[]>(this.apiUrl)
  }
  getCompanybyCode(id:any):Observable<companyModel>{
    return this.http.get<companyModel>(this.apiUrl+'/'+id)
  }
  removeCompanybyCode(id:any){
    return this.http.delete(this.apiUrl+'/'+id)
  }
  updateCompanybyCode(id:any,companyData:any){
    return this.http.put(this.apiUrl+'/'+id,companyData)
  }
  createCompany(data:any){
    return this.http.post(this.apiUrl,data)
  }
}
