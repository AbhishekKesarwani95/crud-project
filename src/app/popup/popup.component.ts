import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  editData:any
  constructor(private builder:FormBuilder,private dialog:MatDialog, private api:ApiService, @Inject(MAT_DIALOG_DATA) public data:any){

  }
  ngOnInit(): void {
      if(this.data.id!=''&& this.data.id!=null){
        this.api.getCompanybyCode(this.data.id).subscribe(res=>{
          this.editData=res;
          this.companyForm.setValue({id:this.editData.id,name:this.editData.name,empcount:this.editData.empcount,revenue:this.editData.revenue,address:this.editData.address,isactive:this.editData.isactive})
        });
      }
  }
  companyForm=this.builder.group({
    id:this.builder.control({value:'',disabled:true}),
    name:this.builder.control('',Validators.required),
    empcount:this.builder.control('',Validators.required),
    revenue:this.builder.control('',Validators.required),
    address:this.builder.control('',Validators.required),
    isactive:this.builder.control(true),
  })
  
  saveCompany(){
    if(this.companyForm.valid){
      const id=this.companyForm.getRawValue().id;
      if(id!=''){
        this.api.updateCompanybyCode(id,this.companyForm.value).subscribe(res=>{
          alert(`Data Updated Successfully`);
          this.closePopup();
        })
      }
      else{
        this.api.createCompany(this.companyForm.value).subscribe(res=>{
          alert(`Data successfully saved ${res}`);
          this.closePopup();
        })
      }
      
      
    }
  }
  closePopup(){
    this.dialog.closeAll();
  }
}
