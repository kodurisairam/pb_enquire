import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RsbService } from 'src/app/service/rsb.service';

@Component({
  selector: 'app-project-finance',
  templateUrl: './project-finance.component.html',
  styleUrls: ['./project-finance.component.css']
})
export class ProjectFinanceComponent implements OnInit {
  financeForm:FormGroup;
  constructor(private fb:FormBuilder,
    private rsbService:RsbService
  ) { }

  ngOnInit(): void {
    this.financeForm=this.fb.group({
      prjName:['',[Validators.required]],
      budget:['',[Validators.required]],
      prjLocation:['',[Validators.required]],
      description:['',[Validators.required]]


    })

  }
  submit(){
    alert("getting");
    const args={
      projectName:this.prjName.value,
      budjet:this.budget.value,
      projectLocation:this.prjLocation.value,
      description:this.description.value
    }
    this.rsbService.addProjectFinance(args).subscribe((rsp)=>{

    })
  }

  get prjName(){return this.financeForm.get('prjName')}
  get budget(){return this.financeForm.get('budget')}
  get prjLocation(){return this.financeForm.get('prjLocation')}
  get description(){return this.financeForm.get('description')}


}
