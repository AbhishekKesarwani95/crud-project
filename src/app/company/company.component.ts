import { Component,OnInit } from '@angular/core';
import { companyModel } from '../model/companyModel';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companydata!:companyModel[]
  displayColumns:string[]=["id","name","empcount","revenue","address","isactive","action"];
  constructor(private dialog:MatDialog,private api:ApiService){

  }
  ngOnInit(): void {
      this.loadCompany()
  }
  openPopup(id?:any){
    const _popup=this.dialog.open(PopupComponent,{
      width:'500px',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      data:{
        id:id
      }

    })
    _popup.afterClosed().subscribe(res=>{
      this.loadCompany();
    })
  }
  editCompany(id:any){
    this.openPopup(id);
  }
  deleteCompany(id:any){
    this.api.removeCompanybyCode(id).subscribe(res=>{
      alert(`Data Deleted Successfully ${id}`)
      this.loadCompany()
    })
  }
  loadCompany(){

    this.api.getAllCompany().subscribe(res=>{
      this.companydata=res;
    })
  }
}
